package dao

import (
	"myapp/internal/entities"
	"time"
)

type Reply struct {
	Id      int
	Content string
	UserId  int
	PostId  int
	CreatedAt time.Time
	UpdatedAt time.Time

	User User `gorm:"foreignKey:user_id"`
    Post Post `gorm:"foreignKey:post_id"`
}

func (r *Reply) ToEntity() *entities.Reply {
	return &entities.Reply{
		Id:        r.Id,
		Content:   r.Content,
		User:      r.User.ToEntity(),
		CreatedAt: r.CreatedAt,
		UpdatedAt: r.UpdatedAt,
	}
}