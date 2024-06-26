package repositories

import (
	"myapp/internal/entities"

	"gorm.io/gorm"
)

type LoginRepository struct {
	Conn *gorm.DB
}

func NewLoginRepository(conn *gorm.DB) *LoginRepository {
	return &LoginRepository{
		Conn: conn,
	}
}

func (r *LoginRepository) Login(email string) (*entities.Login, error) {
	var login entities.Login
	if err := r.Conn.Table("users").Where("email = ?", email).First(&login).Error; err != nil {
		return nil, err
	}
	return &login, nil
}
