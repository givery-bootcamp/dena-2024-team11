package entities

import "time"

type User struct {
	Id      int `json:"id"`
	Name string `json:"name"`
	Icon  string `json:"icon"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

