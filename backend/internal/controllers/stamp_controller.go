package controllers

import (
	"errors"
	"myapp/internal/controllers/request"
	"myapp/internal/controllers/response"
	"myapp/internal/repositories"

	"github.com/gin-gonic/gin"
)


func AddPostStamp(ctx *gin.Context) {
	req := request.AddPostStampRequest{}
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

	stamps := convertPostStampsToStamps(postStamped.Stamps)
	ctx.JSON(201, response.NewPostResponse(postStamped, len(postStamped.Replies), stamps))
}
