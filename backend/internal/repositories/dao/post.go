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

	User User `gorm:"foreignKey:UserId"`	
	Replies []*Reply
	Stamps []*PostStamp
}

func (p *Post) ToEntity() *entities.Post {
	replies := []*entities.Reply{}
	for _, reply := range p.Replies {
		replies = append(replies, reply.ToEntity())
	}

	Stamps := []*entities.Stamp{}
	for _, postStamp := range p.Stamps {
		Stamps = append(Stamps, postStamp.ToEntity())
	}


	return &entities.Post{
		Id:        p.Id,
		Content:   p.Content,
		User:      p.User.ToEntity(),
		CreatedAt: p.CreatedAt,
		UpdatedAt: p.UpdatedAt,
		Replies:  replies,
		Stamps: Stamps,
	}
}