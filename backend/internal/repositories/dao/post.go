package dao

import (
	"myapp/internal/entities"
	"time"
)

type Post struct {
	Id      int
	Content string
	UserId  int
	CreatedAt time.Time
	UpdatedAt time.Time

	User User `gorm:"foreignKey:user_id"`
	Replies []*Reply 
}

func (p *Post) ToEntity() *entities.Post {
	replies := []*entities.Reply{}
	for _, reply := range p.Replies {
		replies = append(replies, reply.ToEntity())
	}
	return &entities.Post{
		Id:        p.Id,
		Content:   p.Content,
		User:      p.User.ToEntity(),
		CreatedAt: p.CreatedAt,
		UpdatedAt: p.UpdatedAt,
		Replies:  replies,
	}
}