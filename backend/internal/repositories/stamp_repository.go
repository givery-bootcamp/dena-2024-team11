package repositories

import (
	"myapp/internal/entities"
	"myapp/internal/repositories/dao"

	"gorm.io/gorm"
)

type StampRepository struct {
	Conn *gorm.DB
}

func NewStampRepository(conn *gorm.DB) *StampRepository {
	return &StampRepository{
		Conn: conn,
	}
}

func (r *StampRepository) createStamp(stamp interface{}, preloadAssociations []string, idField string, id int, result interface{}) error {
	if err := r.Conn.Create(stamp).Error; err != nil {
		return err
	}
	query := r.Conn
	for _, association := range preloadAssociations {
		query = query.Preload(association)
	}
	if err := query.Where(idField+" = ?", id).First(result).Error; err != nil {
		return err
	}
	return nil
}

func (r *StampRepository) CreatePostStamp(postId int, userId int, name string) (*entities.Post, error) {
	postStamp := dao.PostStamp{
		PostId:  postId,
		UserId:  userId,
		Name:    name,
	}
	var stampedPost dao.Post
	err := r.createStamp(&postStamp, []string{"User", "Replies", "Stamps.User"}, "id", postId, &stampedPost)
	if err != nil {
		return nil, err
	}
	return stampedPost.ToEntity(), nil
}

func (r *StampRepository) CreateReplyStamp(replyId int, userId int, name string) (*entities.Reply, error) {
	replyStamp := dao.ReplyStamp{
		ReplyId: replyId,
		UserId:  userId,
		Name:    name,
	}
	var stampedReply dao.Reply
	err := r.createStamp(&replyStamp, []string{"User", "Stamps.User"}, "id", replyId, &stampedReply)
	if err != nil {
		return nil, err
	}
	return stampedReply.ToEntity(), nil
}


func (r *StampRepository) RemovePostStamp(postId int, userId int, name string) (*entities.Post, error) {
	postStamp := dao.PostStamp{
		PostId:  postId,
		UserId:  userId,
		Name:    name,
	}
    if err := r.Conn.Where("name = ? AND user_id = ? AND post_id = ?", name, userId, postId).Delete(&postStamp).Error; err != nil {
        return nil, err
    }

	var stampedPost dao.Post
	if err := r.Conn.Where("id = ?", postId).Preload("User").Preload("Replies").Preload("Stamps.User").First(&stampedPost).Error; err != nil {
		return nil, err
	}
	return stampedPost.ToEntity(), nil
}

