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
}

func NewReplyResponse(reply *entities.Reply) *Reply{
	return &Reply{
		Id: reply.Id,
		Content: reply.Content,
		CreatedAt: reply.CreatedAt,
		UpdatedAt: reply.UpdatedAt,
		PostId: reply.PostId,
		User: NewUserReseponse(reply.User),
	}
}

type GetRepliesByPostIdResponse []*Reply
