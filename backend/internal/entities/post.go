package entities

import "time"

type Post struct {
	Id      int `json:"id"`
	Content string `json:"content"`
	UserId  string `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

