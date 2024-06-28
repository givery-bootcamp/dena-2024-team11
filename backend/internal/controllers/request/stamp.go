package request

type PostStampRequest struct {
	PostId  int    `json:"post_id"`
	UserId  int    `json:"user_id"`
	Name string `json:"stamp_name"`
}

type ReplyStampRequest struct {
	ReplyId  int    `json:"reply_id"`
	UserId  int    `json:"user_id"`
	Name string `json:"stamp_name"`
}