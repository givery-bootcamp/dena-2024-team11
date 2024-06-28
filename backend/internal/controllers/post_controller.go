package controllers

import (
	"errors"
	"myapp/internal/controllers/request"
	"myapp/internal/controllers/response"
	"myapp/internal/entities"
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
			stamps := convertPostStampsToStamps(post.Stamps)
			res = append(res, response.NewPostResponse(post, len(post.Replies), stamps))
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

	stamps := convertPostStampsToStamps(post.Stamps)
	ctx.JSON(201, response.NewPostResponse(post, len(post.Replies), stamps))
}

func convertPostStampsToStamps(postStamps []*entities.Stamp) []response.Stamp {
    stampMap := make(map[string]map[int]struct{})
    for _, ps := range postStamps {
        key := ps.Name
        if _, exists := stampMap[key]; !exists {
            stampMap[key] = make(map[int]struct{})
        }
        stampMap[key][ps.User.Id] = struct{}{}
    }

    var stamps []response.Stamp
    for name, users := range stampMap {
        userIds := make([]int, 0, len(users))
        for userId := range users {
            userIds = append(userIds, userId)
        }
        stamps = append(stamps, response.Stamp{
            Name:    name,
            UserIds: userIds,
            Count:   len(userIds),
        })
    }
    return stamps
}
