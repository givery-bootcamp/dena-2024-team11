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
	var posts []*dao.Post
	if err := r.Conn.Preload("Replies").Preload("User").Find(&posts).Error; err != nil {
		return nil, err
	}
   
	var result []*entities.Post
	for _, post := range posts {
		result = append(result, post.ToEntity())
	} 
    
	return result, nil
}



