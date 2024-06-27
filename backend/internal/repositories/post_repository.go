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
	var rows []dao.PostWithRelations

	if err := r.fetchPostData(&rows); err != nil {
		return nil, err
	}

	postMap := r.createPostMap(rows)
	return r.convertToEntityPosts(postMap), nil
}

func (r *PostRepository) fetchPostData(rows *[]dao.PostWithRelations) error {
	return r.Conn.Table("posts").
		Select(`posts.*, users.name as user_name,
                replies.id as reply_id, replies.user_id as reply_user_id, replies.content as reply_content,
                post_stamps.name as stamp_name, post_stamps.user_id as stamp_user_id`).
		Joins("left join users on users.id = posts.user_id").
		Joins("left join replies on replies.post_id = posts.id").
		Joins("left join post_stamps on post_stamps.post_id = posts.id").
		Find(rows).Error
}

func (r *PostRepository) createPostMap(rows []dao.PostWithRelations) map[int]*dao.Post {
	postMap := make(map[int]*dao.Post)
	for _, row := range rows {
		post, exists := postMap[row.Id]
		if !exists {
			post = r.initializePost(&row)
			postMap[row.Id] = post
		}
		r.addReplyIfExists(post, &row)
		r.addStampIfExists(post, &row)
	}
	return postMap
}

func (r *PostRepository) initializePost(row *dao.PostWithRelations) *dao.Post {
	post := &row.Post
	post.User = dao.User{Id: row.UserId, Name: row.UserName}
	post.Replies = []*dao.Reply{}
	post.Stamps = []*dao.PostStamp{}
	return post
}

func (r *PostRepository) addReplyIfExists(post *dao.Post, row *dao.PostWithRelations) {
	if row.ReplyID != 0 {
		reply := &dao.Reply{
			Id:      row.ReplyID,
			UserId:  row.ReplyUserID,
			Content: row.ReplyContent,
			PostId:  post.Id,
			User:    dao.User{Id: row.ReplyUserID},
		}
		post.Replies = append(post.Replies, reply)
	}
}

func (r *PostRepository) addStampIfExists(post *dao.Post, row *dao.PostWithRelations) {
	if row.StampName != "" {
		stamp := &dao.PostStamp{
			Name:   row.StampName,
			UserId: row.StampUserID,
			PostId: post.Id,
			User:   dao.User{Id: row.StampUserID},
		}
		post.Stamps = append(post.Stamps, stamp)
	}
}

func (r *PostRepository) convertToEntityPosts(postMap map[int]*dao.Post) []*entities.Post {
	var result []*entities.Post
	for _, post := range postMap {
		entityPost := &entities.Post{
			Id:        post.Id,
			Content:   post.Content,
			User:      &entities.User{Id: post.User.Id, Name: post.User.Name},
			Replies:   mapReplies(post.Replies),
			Stamps:    mapStamps(post.Stamps),
			CreatedAt: post.CreatedAt,
			UpdatedAt: post.UpdatedAt,
		}
		result = append(result, entityPost)
	}
	return result
}

func mapReplies(daoReplies []*dao.Reply) []*entities.Reply {
	var replies []*entities.Reply
	for _, daoReply := range daoReplies {
		entityReply := &entities.Reply{
			Id:        daoReply.Id,
			Content:   daoReply.Content,
			User:      &entities.User{Id: daoReply.User.Id, Name: daoReply.User.Name},
			PostId:    daoReply.PostId,
			CreatedAt: daoReply.CreatedAt,
			UpdatedAt: daoReply.UpdatedAt,
		}
		replies = append(replies, entityReply)
	}
	return replies
}

func mapStamps(daoStamps []*dao.PostStamp) []*entities.Stamp {
	var stamps []*entities.Stamp
	for _, daoStamp := range daoStamps {
		stamps = append(stamps, &entities.Stamp{
			Name: daoStamp.Name,
			User: &entities.User{Id: daoStamp.User.Id},
		})
	}
	return stamps
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
