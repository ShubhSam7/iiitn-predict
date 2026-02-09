package auth

import (
	"net/http"
	"regexp"

	"iiitn-predict/packages/database"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type SignupRequest struct{
    Name        string `json:"name"`
    Email       string `json:"email"`
    Password    string `json:"password"`
}

type LoginRequest struct{
    Email       string `json:"email"`
    Password    string `json:"password"`
}

type AdminRequest struct{
    Email       string `json:"email"`
    Password    string `json:"password"`
    Role        database.RoleType `json:"role"`
}

func ValidEmail(email string) bool{
    pattern := `^[a-z]{2}[0-9]{2}[a-z]{3}[0-9]{3}@iiitn\.ac\.in$`
    matched, _ := regexp.MatchString(pattern, email)
    return matched
}

func Signup(c *gin.Context){
    var req SignupRequest
    if err := c.ShouldBindJSON(&req); err != nil{
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
        return
    }
    hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "failed"}) 
        return  
    }

    user := database.User{
        Name: req.Name,
        Email: req.Email,
        Password: string(hashed),
        Balance: 10000,
        Role: database.RoleTypeStudent,
    }
    if(!ValidEmail(req.Email)){
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid email"})
        return
    }

    if err := database.DB.Create(&user).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "email already exist"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"msg": "Signup is Successfull"})
}

func Signin(c *gin.Context){
    var req LoginRequest
    if err := c.ShouldBindJSON(&req); err != nil{
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
        return
    }

    user := database.User{
        Email: req.Email,
        Password: req.Password,
    }

    if err := database.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Email not found"})
        return
    }

    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Password is wrong"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"msg": "Login is Successfull", "balance": user.Balance}) 
}

func AdminLogin(c *gin.Context){
    var req AdminRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Admin Login Failed"})
        return
    }

    user := database.User{
        Name: req.Email,
        Email: req.Email,
        Role: req.Role,
    }

    if err := database.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Email not found"})
        return
    }

    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Password is wrong"})
        return
    }

    if user.Role != database.RoleTypeAdmin {
        c.JSON(http.StatusForbidden, gin.H{"error": "You are not an admin"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"msg": "Admin Login is Successfull"})
}