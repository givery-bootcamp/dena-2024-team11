package request

type LoginRequest struct {
	UserId  int    `json:"user_id"`
	Password string `json:"password"`
}
