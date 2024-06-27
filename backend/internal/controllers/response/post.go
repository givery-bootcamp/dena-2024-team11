package response

import (
	"myapp/internal/entities"
	"time"
)

type Stamp struct {
	Name string `json:"name"`
	UserIds []int`json:"users"`
	Count int`json:"count"`
}

type Post struct {
	Id        int       `json:"id"`
	Content   string    `json:"content"`
	User      *User     `json:"user"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	NumReply  int       `json:"num_reply"`
	Stamps []Stamp		`json:"stamps"`
}

func NewPostResponse(post *entities.Post, numReply int, stamps []Stamp) *Post {
	return &Post{
		Id: post.Id,
		Content: post.Content,
		User: NewUserReseponse(post.User),
		CreatedAt: post.CreatedAt,
		UpdatedAt: post.UpdatedAt,
		NumReply: numReply,
		Stamps: stamps,
	}
}

type GetPostsResponse []*Post
