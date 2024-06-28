package dao

import (
	"myapp/internal/entities"
	"time"
)

type Reply struct {
	Id        int
	Content   string
	UserId    int
	PostId    int
	CreatedAt time.Time
	UpdatedAt time.Time

	User User `gorm:"foreignKey:UserId"`
	Post Post `gorm:"foreignKey:PostId"`
}

func (r *Reply) ToEntity() *entities.Reply {
	return &entities.Reply{
		Id:        r.Id,
		Content:   r.Content,
		User:      r.User.ToEntity(),
		PostId:    r.PostId,
		CreatedAt: r.CreatedAt,
		UpdatedAt: r.UpdatedAt,
	}
}
