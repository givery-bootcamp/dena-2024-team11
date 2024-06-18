package dao

import "myapp/internal/entities"

type User struct {
	Id      int 
	Name string 
	Icon  string
}

func (u *User) ToEntity() *entities.User {
	return &entities.User{
		Id:      u.Id,
		Name:    u.Name,
		Icon:    u.Icon,
	}
}