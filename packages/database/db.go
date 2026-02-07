package database

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
    if err := godotenv.Load("../../.env"); err != nil {
        log.Println("No .env file found, using system environment variables")
    }

    dsn := os.Getenv("DATABASE_URL")
    
    if dsn == "" {
        panic("DATABASE_URL is not set in environment")
    }
    
    fmt.Println("Connecting to database...")
    
    var err error
    DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
    
    if err != nil {
        panic(fmt.Sprintf("Failed to connect to database: %v", err))
    }

    log.Println("Database connected successfully")
    
    if err := DB.AutoMigrate(&User{}, &Market{}, &Position{}, &Transaction{}); err != nil {
        panic(fmt.Sprintf("Failed to migrate database: %v", err))
    }
}



type RoleType int

const (
	RoleTypeAdmin RoleType = iota
	RoleTypeStudent
)

type CategoryType int

type StatusType int
const (
	StatusTypeActive StatusType = iota
	StatusTypeClosed
)

type TransactionType int

const (
	TransactionTypeSignupBonus TransactionType = iota
	TransactionTypeBetPlaced
	TransactionTypePayout
)

type User struct {
    gorm.Model
    Name     string `gorm:"not null"`
    Password string `gorm:"not null"`
    Email    string `gorm:"uniqueIndex;not null"`
    Balance  int32  `gorm:"default:10000"`
    Role     RoleType
}

type Market struct {
    gorm.Model
    Question    string `gorm:"not null"`
    Description string
    Category    CategoryType
    Status      StatusType	
    Outcome     bool
}

type Position struct {
    gorm.Model
    UserID   uint   `gorm:"not null"`
    MarketID uint   `gorm:"not null"`
    Outcome  bool  
    Amount   int32  `gorm:"not null"`
}

type Transaction struct {
    gorm.Model
    UserID      uint             `gorm:"not null"`
    Amount      int32            `gorm:"not null"`
    TransType   TransactionType
    ReferenceID uint           
}