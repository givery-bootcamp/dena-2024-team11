package entities

// import "time"

type Stamp struct {
	Name string `json:"name"`
	User *User `json:"user"`
	// PostId int `json:"post_id"`
	// CreatedAt time.Time `json:"created_at"`
	// UpdatedAt time.Time `json:"updated_at"`
}