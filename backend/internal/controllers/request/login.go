package request

type LoginRequest struct {
	UserId   string `json:"user_id"`
	Password string `json:"password"`
}
