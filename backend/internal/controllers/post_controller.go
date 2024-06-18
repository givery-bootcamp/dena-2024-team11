package controllers

import (
	"errors"
	"myapp/internal/controllers/request"
	"myapp/internal/controllers/response"
	"myapp/internal/repositories"

	"github.com/gin-gonic/gin"
)

func GetPosts(ctx *gin.Context) {
	repository := repositories.NewPostRepository(DB(ctx))
	posts, err := repository.GetAllPosts()
	if err != nil {
		handleError(ctx, 500, err)
	} else if posts != nil {

		res := response.GetPostsResponse{}
		for _, post := range posts {
			res = append(res, response.NewPostResponse(post, len(post.Replies)))
		}
		ctx.JSON(200, res)
	} else {
		handleError(ctx, 404, errors.New("not found"))
	}
}

func PostPosts(ctx *gin.Context) {
	req := request.PostPostsRequest{}
	if err := ctx.ShouldBindJSON(&req); err != nil {
		handleError(ctx, 400, errors.New("post posts request body is unvalid"))
		return
	}
	repository := repositories.NewPostRepository(DB(ctx))
	post, err := repository.CreatePost(req.UserId, req.Content)
	if err != nil || post == nil {
		handleError(ctx, 500, errors.New("create post record failed"))
		return
	}
	ctx.JSON(201, response.NewPostResponse(post, len(post.Replies)))
}
