package repositories

import (
	"myapp/internal/entities"
	"time"

	"gorm.io/gorm"
)

type PostRepository struct {
	Conn *gorm.DB
}

type Post struct {
	Id      int
	Content string
	UserId  string
	CreatedAt time.Time
	UpdatedAt time.Time
}


func NewPostRepository(conn *gorm.DB) *PostRepository {
	return &PostRepository{
		Conn: conn,
	}
}

func (r *PostRepository) GetAllPosts() ([]*entities.Post, error) {
	var posts []*Post
	if err := r.Conn.Find(&posts).Error; err != nil {
		return nil, err
	}

	var result []*entities.Post
	for _, post := range posts {
		result = append(result, &entities.Post{
			Id:        post.Id,
			Content:   post.Content,
			UserId:    post.UserId,
			CreatedAt: post.CreatedAt,
			UpdatedAt: post.UpdatedAt,
		})
	}

	return result, nil
}