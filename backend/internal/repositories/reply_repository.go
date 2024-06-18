package repositories

import (
	"myapp/internal/entities"
	"myapp/internal/repositories/dao"

	"gorm.io/gorm"
)

type ReplyRepository struct {
	Conn *gorm.DB
}

func NewReplyRepository(conn *gorm.DB) *ReplyRepository {
	return &ReplyRepository{
		Conn: conn,
	}
}

func (r *ReplyRepository) GetRepliesByPostId(postId int) ([]*entities.Reply, error) {
	var replies []*dao.Reply
	if err := r.Conn.Debug().Preload("User").Where("post_id = ?", postId).Find(&replies).Error; err != nil {
		return nil, err
	}
	var result []*entities.Reply
	for _, reply := range replies {
		result = append(result, reply.ToEntity())
	}
	return result, nil
}

func (r *ReplyRepository) CreateReply(postId int, userId int, content string) (*entities.Reply, error) {
	reply := dao.Reply{
		PostId:  postId,
		Content: content,
		UserId:  userId,
	}
	if err := r.Conn.Create(&reply).Error; err != nil {
		return nil, err
	}
	reply = dao.Reply{
		Id: reply.Id,
	}
	if err := r.Conn.Debug().Preload("User").Find(&reply).Error; err != nil {
		return nil, err
	}
	return reply.ToEntity(), nil
}
