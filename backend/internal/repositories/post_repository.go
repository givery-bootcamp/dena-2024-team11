package repositories

import (
	"myapp/internal/entities"
	"myapp/internal/repositories/dao"

	"gorm.io/gorm"
)

type PostRepository struct {
	Conn *gorm.DB
}

func NewPostRepository(conn *gorm.DB) *PostRepository {
	return &PostRepository{Conn: conn}
}

func (r *PostRepository) GetAllPosts() ([]*entities.Post, error) {
	r.Conn = r.Conn.Debug()
	var posts []dao.Post

	if err := r.fetchPostData(&posts); err != nil {
		return nil, err
	}

	return convertDaoPostsToEntityPosts(posts), nil
}

func (r *PostRepository) fetchPostData(posts *[]dao.Post) error {
	return r.Conn.Preload("User").
		Preload("Replies").
		Preload("Replies.User").
		Preload("Stamps").
		Preload("Stamps.User").
		Find(posts).Error
}

func convertDaoPostsToEntityPosts(daoPosts []dao.Post) []*entities.Post {
	var entityPosts []*entities.Post
	for _, daoPost := range daoPosts {
		entityPost := &entities.Post{
			Id:        daoPost.Id,
			Content:   daoPost.Content,
			User:      daoPost.User.ToEntity(),
			CreatedAt: daoPost.CreatedAt,
			UpdatedAt: daoPost.UpdatedAt,
			Replies:   convertDaoRepliesToEntityReplies(daoPost.Replies),
			Stamps:    convertDaoStampsToEntityStamps(daoPost.Stamps),
		}
		entityPosts = append(entityPosts, entityPost)
	}
	return entityPosts
}

func convertDaoRepliesToEntityReplies(daoReplies []*dao.Reply) []*entities.Reply {
	var entityReplies []*entities.Reply
	for _, daoReply := range daoReplies {
		entityReply := &entities.Reply{
			Id:        daoReply.Id,
			Content:   daoReply.Content,
			User:      daoReply.User.ToEntity(),
			PostId:    daoReply.PostId,
			CreatedAt: daoReply.CreatedAt,
			UpdatedAt: daoReply.UpdatedAt,
		}
		entityReplies = append(entityReplies, entityReply)
	}
	return entityReplies
}

func convertDaoStampsToEntityStamps(daoStamps []*dao.PostStamp) []*entities.Stamp {
	var entityStamps []*entities.Stamp
	for _, daoStamp := range daoStamps {
		entityStamp := &entities.Stamp{
			Name: daoStamp.Name,
			User: daoStamp.User.ToEntity(),
		}
		entityStamps = append(entityStamps, entityStamp)
	}
	return entityStamps
}

func (r *PostRepository) CreatePost(userId int, content string) (*entities.Post, error) {
	post := dao.Post{
		Content: content,
		UserId:  userId,
	}
	if err := r.Conn.Create(&post).Error; err != nil {
		return nil, err
	}
	if err := r.Conn.Debug().Preload("User").First(&post, post.Id).Error; err != nil {
		return nil, err
	}
	return post.ToEntity(), nil
}
