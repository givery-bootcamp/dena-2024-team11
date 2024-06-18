package response

import "myapp/internal/entities"

type User struct {
	Id      int `json:"id"`
	Name string `json:"name"`
	Icon  string `json:"icon"`
}

func (u *User) CreateWith(user entities.User) {
	u.Id = user.Id
	u.Name = user.Name
	u.Icon = user.Icon
}