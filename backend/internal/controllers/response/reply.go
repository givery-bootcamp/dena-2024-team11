package response

import (
	"myapp/internal/entities"
	"time"
)


type Reply struct {
	Id        int       `json:"id"`
	Content   string    `json:"content"`
	User      *User     `json:"user"`
	PostId    int       `json:"post_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Stamps []Stamp		`json:"stamps"`
}

func NewReplyResponse(reply *entities.Reply, stamps []Stamp) *Reply{
	return &Reply{
		Id: reply.Id,
		Content: reply.Content,
		CreatedAt: reply.CreatedAt,
		UpdatedAt: reply.UpdatedAt,
		PostId: reply.PostId,
		User: NewUserResponse(reply.User),
		Stamps: stamps,
	}
}

type GetRepliesByPostIdResponse []*Reply
