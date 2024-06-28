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

func (r *StampRepository) CreatePostStamp(postId int, userId int, name string) (*entities.Post, error) {
	postStamp := dao.PostStamp{
		PostId:  postId,
		UserId:  userId,
		Name: name,
	}
	if err := r.Conn.Create(&postStamp).Error; err != nil {
		return nil, err
	}
	var stampedPost dao.Post
	if err := r.Conn.Preload("User").Preload("Replies.User").Preload("Stamps.User").Where("post_id = ?", postId).First(&stampedPost).Error; err != nil {
		return nil, err
	}
	return stampedPost.ToEntity(), nil
}
