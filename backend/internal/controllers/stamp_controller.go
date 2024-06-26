package controllers

import (
	"errors"
	"myapp/internal/controllers/request"
	"myapp/internal/controllers/response"
	"myapp/internal/repositories"

	"github.com/gin-gonic/gin"
)


func AddPostStamp(ctx *gin.Context) {
	req := request.PostStampRequest{}
	if err := ctx.ShouldBindJSON(&req); err != nil {
		handleError(ctx, 400, errors.New("add post stamp request body is invalid"))
		return
	}
	repository := repositories.NewStampRepository(DB(ctx))
	postStamped, err := repository.CreatePostStamp(req.PostId, req.UserId, req.Name)
	if err != nil || postStamped == nil{
		handleError(ctx, 500, errors.New("create postStamp record failed"))
		return
	}

	stamps := EntityStampsToResponse(postStamped.Stamps)
	ctx.JSON(201, response.NewPostResponse(postStamped, len(postStamped.Replies), stamps))
}

func AddReplyStamp(ctx *gin.Context) {
	req := request.ReplyStampRequest{}
	if err := ctx.ShouldBindJSON(&req); err != nil {
		handleError(ctx, 400, errors.New("add reply stamp request body is invalid"))
		return
	}
	repository := repositories.NewStampRepository(DB(ctx))
	replyStamped, err := repository.CreateReplyStamp(req.ReplyId, req.UserId, req.Name)
	if err != nil || replyStamped == nil {
		handleError(ctx, 500, errors.New("create replyStamp record failed"))
		return
	}

	stamps := EntityStampsToResponse(replyStamped.Stamps)
	ctx.JSON(201, response.NewReplyResponse(replyStamped, stamps))
}

func RemovePostStamp(ctx *gin.Context) {
	req := request.PostStampRequest{}
	if err := ctx.ShouldBindJSON(&req); err != nil {
		handleError(ctx, 400, errors.New("add post stamp request body is invalid"))
		return
	}
	repository := repositories.NewStampRepository(DB(ctx))
	postStamped, err := repository.RemovePostStamp(req.PostId, req.UserId, req.Name)
	if err != nil || postStamped == nil{
		handleError(ctx, 500, errors.New("remove postStamp record failed"))
		return
	}

	stamps := EntityStampsToResponse(postStamped.Stamps)
	ctx.JSON(201, response.NewPostResponse(postStamped, len(postStamped.Replies), stamps))
}

func RemoveReplyStamp(ctx *gin.Context) {
	req := request.ReplyStampRequest{}
	if err := ctx.ShouldBindJSON(&req); err != nil {
		handleError(ctx, 400, errors.New("remove reply stamp request body is invalid"))
		return
	}
	repository := repositories.NewStampRepository(DB(ctx))
	replyStamped, err := repository.RemoveReplyStamp(req.ReplyId, req.UserId, req.Name)
	if err != nil || replyStamped == nil {
		handleError(ctx, 500, errors.New("remove replyStamp record failed"))
		return
	}

	stamps := EntityStampsToResponse(replyStamped.Stamps)
	ctx.JSON(201, response.NewReplyResponse(replyStamped, stamps))
}