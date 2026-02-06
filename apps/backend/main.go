package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "IIITN Predict Backend is Live!",
        })
    })
    r.Run(":8080") // Listen and serve on 0.0.0.0:8080
}