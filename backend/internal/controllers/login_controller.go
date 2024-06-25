package controllers

import (
	"errors"
	"myapp/internal/controllers/request"
	"myapp/internal/repositories"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func Login(ctx *gin.Context) {
	req := request.LoginRequest{}
	if err := ctx.ShouldBindJSON(&req); err != nil {
		handleError(ctx, 400, errors.New("login request body is invalid"))
		return
	}
	repository := repositories.NewLoginRepository(DB(ctx))
	result, err := repository.Login(req.UserId)
	if err != nil {
		handleError(ctx, 404, errors.New("user not found")) 
	}
	if result.Password != req.Password {
		handleError(ctx, 401, errors.New("password is invalid"))
		return
	}
    session := sessions.Default(ctx)
    session.Set("UserId", result.Id)
    session.Save()
	ctx.JSON(200, gin.H{})
}