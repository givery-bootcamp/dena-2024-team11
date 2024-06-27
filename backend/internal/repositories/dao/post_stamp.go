package dao

import (
	"myapp/internal/entities"
	// "time"
)

type PostStamp struct {
	Name   string
	UserId    int
	// PostId    int
	// CreatedAt time.Time
	// UpdatedAt time.Time

	User User `gorm:"foreignKey:UserId"`
	// Post Post `gorm:"foreignKey:post_id"`
}

func (r *PostStamp) ToEntity() *entities.Stamp {
	return &entities.Stamp{
		Name:        r.Name,
		// UserId:      r.UserId,
		User:		r.User.ToEntity(),
		// PostId:    r.PostId,
		// CreatedAt: r.CreatedAt,
		// UpdatedAt: r.UpdatedAt,
	}
}
