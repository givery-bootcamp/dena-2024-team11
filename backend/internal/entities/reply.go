package entities

import "time"

type Reply struct {
	Id      int `json:"id"`
	Content string `json:"content"`
	User  *User `json:"user"`
	PostId int `json:"post_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Stamps []*Stamp `json:"stamps"`
}