package main

import (
	"iiitn-predict/apps/backend/auth"
	"iiitn-predict/packages/database"
	"github.com/gin-gonic/gin"
)

func main() {
    database.InitDB()
    database.SeedAdmin()
    r := gin.Default()

    authGroup := r.Group("/auth")
    {
        authGroup.POST("/signup", auth.Signup) // signup the user with 10k coins
        authGroup.POST("/signin", auth.Signin) // signin the user
        authGroup.POST("/admin/login", auth.AdminLogin) //admin login
    }

    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "IIITN Predict Backend is Live!",
        })
    })
    r.Run(":8080")
}