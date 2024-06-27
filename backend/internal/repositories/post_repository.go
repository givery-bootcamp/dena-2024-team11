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
	return &PostRepository{
		Conn: conn,
	}
}

func (r *PostRepository) GetAllPosts() ([]*entities.Post, error) {
    var result []*entities.Post
    var rows []struct {
        dao.Post
        UserName    string `gorm:"column:user_name"`
        // UserIcon    string `gorm:"column:user_icon"`
        ReplyID     int    `gorm:"column:reply_id"`
        ReplyUserID int    `gorm:"column:reply_user_id"`
        ReplyContent string `gorm:"column:reply_content"`
        StampName   string `gorm:"column:stamp_name"`
        StampUserID int    `gorm:"column:stamp_user_id"`
    }

    if err := r.Conn.Table("posts").
        Select(`posts.*, users.name as user_name,
                replies.id as reply_id, replies.user_id as reply_user_id, replies.content as reply_content,
                post_stamps.name as stamp_name, post_stamps.user_id as stamp_user_id`).
        Joins("left join users on users.id = posts.user_id").
        Joins("left join replies on replies.post_id = posts.id").
        Joins("left join post_stamps on post_stamps.post_id = posts.id").
        Find(&rows).Error; err != nil {
        return nil, err
    }

    // マッピング処理
    postMap := make(map[int]*dao.Post)
    for _, row := range rows {
        post, exists := postMap[row.Id]
        if !exists {
            post = &row.Post
            post.User = dao.User{
                Id:   post.UserId,
                Name: row.UserName,
                // Icon: row.UserIcon,
            }
            post.Replies = []*dao.Reply{}
            post.Stamps = []*dao.PostStamp{}
            postMap[row.Id] = post
        }

        if row.ReplyID != 0 {
            reply := &dao.Reply{
                Id:      row.ReplyID,
                UserId:  row.ReplyUserID,
                Content: row.ReplyContent,
                PostId:  post.Id,
                User: dao.User{
                    Id: row.ReplyUserID,
                },
            }
            post.Replies = append(post.Replies, reply)
        }

        if row.StampName != "" {
            stamp := &dao.PostStamp{
                Name:   row.StampName,
                UserId: row.StampUserID,
                PostId: post.Id,
            }
            post.Stamps = append(post.Stamps, stamp)
        }
    }

    for _, post := range postMap {
        result = append(result, post.ToEntity())
    }

    return result, nil
}

func (r *PostRepository) CreatePost(userId int, content string) (*entities.Post, error) {
	post := dao.Post{
		Content: content,
		UserId: userId,
	}
	if err := r.Conn.Create(&post).Error; err != nil {
		return nil, err
	}
	post = dao.Post{
		Id: post.Id,
	}
	if err := r.Conn.Debug().Preload("User").Find(&post).Error; err != nil {
		return nil, err
	}
	return post.ToEntity(), nil
}
