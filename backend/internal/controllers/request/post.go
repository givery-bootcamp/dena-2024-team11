package request

type PostPostsRequest struct {
	UserId  int    `json:"user_id"`
	Content string `json:"content"`
}
