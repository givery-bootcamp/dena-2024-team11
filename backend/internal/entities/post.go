package entities

import "time"

type Post struct {
	Id      int `json:"id"`
	Content string `json:"content"`
	User  *User `json:"user"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Replies []*Reply `json:"replies"`
	Stamps []*Stamp `json:"stamps"`
}

