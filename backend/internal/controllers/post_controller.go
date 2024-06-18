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
			postResponse := response.Post{}
			postResponse.CreateWith(*post, len(post.Replies))
			res = append(res, &postResponse)
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
	}
	repository := repositories.NewPostRepository(DB(ctx))
	post, err := repository.CreatePost(req.UserId, req.Content)
	if err != nil {
		handleError(ctx, 500, errors.New("create post record failed"))
	}
	// response を返す
	// response の方を定義するところから

	res := response.Post{}
	res.CreateWith(*post, len(post.Replies))
	ctx.JSON(201, res)
}
