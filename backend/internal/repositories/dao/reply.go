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
	Stamps []*ReplyStamp
}

func (r *Reply) ToEntity() *entities.Reply {
	Stamps := []*entities.Stamp{}
	for _, replyStamp := range r.Stamps {
		Stamps = append(Stamps, replyStamp.ToEntity())
	}

	return &entities.Reply{
		Id:        r.Id,
		Content:   r.Content,
		PostId:    r.PostId,
		CreatedAt: r.CreatedAt,
		UpdatedAt: r.UpdatedAt,
		User:      r.User.ToEntity(),
		Stamps:    Stamps,
	}
}
