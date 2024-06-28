package middleware

import (
	"crypto/tls"
	"fmt"
	"myapp/internal/config"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

func SetupRedis() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var conn *redis.Client
		if config.RedisHost == "redis" {
			conn = redis.NewClient(&redis.Options{
				Addr:     fmt.Sprintf("%s:%d", config.RedisHost, config.RedisPort),
				Password: config.RedisPassword,
				DB:       0, // use default DB
			})
		} else {
			// 本番環境では暗号化する
			conn = redis.NewClient(&redis.Options{
				Addr:     fmt.Sprintf("%s:%d", config.RedisHost, config.RedisPort),
				Password: config.RedisPassword,
				DB:       0, // use default DB
				TLSConfig: &tls.Config{
					InsecureSkipVerify: true, // 本番環境では必ず true にしないこと。証明書の検証を有効にします。
				},
			})
		}
		ctx.Set("redis", conn)
		ctx.Next()
	}
}
