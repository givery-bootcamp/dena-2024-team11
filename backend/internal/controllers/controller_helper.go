package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)

type ErrorResponse struct {
	Message string "json:`message`"
}

func DB(ctx *gin.Context) *gorm.DB {
	return ctx.MustGet("db").(*gorm.DB)
}

func Redis(ctx *gin.Context) *redis.Client {
	return ctx.MustGet("redis").(*redis.Client)
}

func handleError(ctx *gin.Context, status int, err error) {
	res := ErrorResponse{
		Message: err.Error(),
	}
	ctx.JSON(status, &res)
}
