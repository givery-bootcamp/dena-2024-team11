package middleware

import (
	"log"
	"myapp/internal/repositories"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

func sessionCheck() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		sessionId, err := ctx.Cookie("session_id")
		log.Println("Session ID:", sessionId)
		if err != nil {
			// Cookie にセッションがない場合、ログインフォームをだす
			ctx.JSON(http.StatusUnauthorized, gin.H{})
			ctx.Abort()
			return
		}

		conn := ctx.MustGet("redis").(*redis.Client)
		repository := repositories.NewSessionRepository(conn)
		userId, err := repository.Get(ctx, sessionId)
		if err != nil {
			// Redis にセッションがない場合、ログインフォームをだす
			ctx.JSON(http.StatusUnauthorized, gin.H{})
			ctx.Abort()
			return
		}
		log.Println("Redis UserID:", userId)
		ctx.Set("UserId", userId)
		ctx.Next()
	}
}