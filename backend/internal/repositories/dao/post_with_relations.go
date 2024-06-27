package dao

type PostWithRelations struct {
	Post
	UserName     string
	ReplyID      int
	ReplyUserID  int
	ReplyContent string
	StampName    string
	StampUserID  int
}
