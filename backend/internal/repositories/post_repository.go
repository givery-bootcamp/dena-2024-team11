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

	var result []*entities.Post
	for _, post := range posts {
		result = append(result, post.ToEntity())
	}

	return result, nil
}

func (r *PostRepository) fetchPostData(posts *[]dao.Post) error {
	return r.Conn.Preload("User").
		Preload("Replies").
		Preload("Replies.User").
		Preload("Stamps").
		Preload("Stamps.User").
		Find(posts).Error
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
