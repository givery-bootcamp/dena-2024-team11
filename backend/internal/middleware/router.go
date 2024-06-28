package middleware

import (
	"myapp/internal/controllers"

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
	app.GET("/hello", sessionCheck(), controllers.HelloWorld)

	app.GET("/posts", controllers.GetPosts)
	app.POST("/posts", sessionCheck(), controllers.PostPosts)
	
	app.GET("/replies", controllers.GetRepliesByPostId)
	app.POST("/replies", sessionCheck(), controllers.PostReply)

	app.POST("/stamp/add/post", sessionCheck(), controllers.AddPostStamp)
	app.POST("/stamp/add/reply", sessionCheck(), controllers.AddReplyStamp)

	app.POST("/login", controllers.Login)
}
