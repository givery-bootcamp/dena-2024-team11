package repositories

import (
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

type SessionRepository struct {
	Conn *redis.Client
}

func NewSessionRepository(conn *redis.Client) SessionRepository {
	return SessionRepository{
		Conn: conn,
	}
}

func (r *SessionRepository) Set(ctx *gin.Context, sessionId string, userId int) error {
	return r.Conn.Set(ctx, sessionId, userId, time.Duration(time.Duration.Seconds(3600))).Err()
}

func (r *SessionRepository) Get(ctx *gin.Context, sessionId string) (int, error) {
	userIdStr, err := r.Conn.Get(ctx, sessionId).Result()
	if err != nil {
		return 0, err
	}
	userId, err := strconv.Atoi(userIdStr)
	if err != nil {
		return 0, err
	}
	return userId, nil
}
