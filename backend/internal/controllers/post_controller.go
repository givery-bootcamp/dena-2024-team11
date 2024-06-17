package controllers

import (
	"errors"
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
			postResponse.CreateWith(*post,len(post.Replies))
			res = append(res, &postResponse)
		}
			ctx.JSON(200, res)
	} else {
		handleError(ctx, 404, errors.New("not found"))
	}
}