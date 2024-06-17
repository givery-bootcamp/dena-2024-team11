package response

import (
	"myapp/internal/entities"
	"time"
)
type Post struct {
	Id      int `json:"id"`
	Content string `json:"content"`
	User  *User `json:"user"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	NumReply int `json:"num_reply"`
}
type GetPostsResponse []*Post

func (p *Post) CreateWith(post entities.Post,numReply int) {
	p.Id = post.Id
	p.Content = post.Content
	p.CreatedAt = post.CreatedAt
	p.UpdatedAt = post.UpdatedAt
	p.NumReply = numReply
	p.User = &User{}
	p.User.CreateWith(*post.User)
}
