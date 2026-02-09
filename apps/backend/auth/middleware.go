package auth

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
	"github.com/golang-jwt/jwt/v5"
	"fmt"
)

func Middleware(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
        c.Abort()
        return
    }

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            // Validate the alg is what you expect (HMAC)
            if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil, fmt.Errorf("unexpected signing method")
            }
            return []byte("my_super_secret_key"), nil
        })
	
	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"msg": "Token is Invalid"})
		c.Abort()
		return
	}

	c.Next()
}