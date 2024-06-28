package request

type LoginRequest struct {
	Email    string `json:"user_id"`
	Password string `json:"password"`
}
