package dao

import (
	"myapp/internal/entities"
	// "time"
)

type PostStamp struct {
	Name   string
	UserId    int
	PostId    int

	User User `gorm:"foreignKey:UserId"`
	Post Post `gorm:"foreignKey:PostId"`
}

type ReplyStamp struct {
	Name   string
	UserId    int
	ReplyId    int

	User User `gorm:"foreignKey:UserId"`
	Post Reply `gorm:"foreignKey:ReplyId"`
}

func (r *PostStamp) ToEntity() *entities.Stamp {
	return &entities.Stamp{
		Name:        r.Name,
		User:		r.User.ToEntity(),
	}
}

func (r *ReplyStamp) ToEntity() *entities.Stamp {
	return &entities.Stamp{
		Name:        r.Name,
		User:		r.User.ToEntity(),
	}
}
