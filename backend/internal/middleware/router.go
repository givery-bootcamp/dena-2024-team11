package middleware

import (
	"myapp/internal/controllers"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(app *gin.Engine) {
	store := cookie.NewStore([]byte("secret"))
    app.Use(sessions.Sessions("mysession", store))

	app.GET("/", func(ctx *gin.Context) {
		ctx.String(200, "It works")
	})
	app.GET("/hello",sessionCheck(), controllers.HelloWorld)
	app.GET("/posts", controllers.GetPosts)
	
	app.POST("/posts",sessionCheck(),controllers.PostPosts)
	app.GET("/replies", controllers.GetRepliesByPostId)
	app.POST("/replies",sessionCheck(), controllers.PostReply)
	app.POST("/login",controllers.Login)
}

func sessionCheck() gin.HandlerFunc {
    return func(ctx *gin.Context) {

        session := sessions.Default(ctx)
        userId := session.Get("UserId")
        // セッションがない場合、ログインフォームをだす
        if userId == nil || userId == "" {
			ctx.JSON(http.StatusUnauthorized, gin.H{})
			ctx.Abort()
			return
		} else {
			ctx.Set("UserId", userId) // ユーザidをセット
            ctx.Next()
		}
    }
}
