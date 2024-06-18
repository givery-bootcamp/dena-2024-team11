package request

type GetRepliesRequest struct {
	PostId int `form:"post_id"`
}

type PostReplyRequest struct {
	PostId  int    `json:"post_id"`
	UserId  int    `json:"user_id"`
	Content string `json:"content"`
}
