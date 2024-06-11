package controllers

import (
	"errors"
	"myapp/internal/repositories"
	"time"

	"github.com/gin-gonic/gin"
)

type Post struct {
	Id      int `json:"id"`
	Content string `json:"content"`
	UserId  string `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type GetPostsResponse []*Post

func GetPosts(ctx *gin.Context) {
	repository := repositories.NewPostRepository(DB(ctx))
	posts, err := repository.GetAllPosts()
	if err != nil { 
		handleError(ctx, 500, err)
	} else if posts != nil {
		response := GetPostsResponse{}
		for _, post := range posts {
			response = append(response, &Post{
				Id: post.Id,	
				Content: post.Content,
				UserId: post.UserId,
				CreatedAt: post.CreatedAt,
				UpdatedAt: post.UpdatedAt,
			})
		}
			ctx.JSON(200, response)
	} else {
		handleError(ctx, 404, errors.New("not found"))
	}
}