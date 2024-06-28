package request

type AddPostStampRequest struct {
	PostId  int    `json:"post_id"`
	UserId  int    `json:"user_id"`
	Name string `json:"name"`
}

type AddReplyStampRequest struct {
	ReplyId  int    `json:"reply_id"`
	UserId  int    `json:"user_id"`
	Name string `json:"name"`
}