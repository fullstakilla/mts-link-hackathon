package main

import (
	"find/handler"
	"find/repo"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"log"
)

func init() {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
}

func main() {
	storage := repo.New()
	c := handler.New(storage)

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(handler.CORSMiddleware())

	auth := router.Group("/auth")
	{
		auth.POST("/signup", c.Register)
		auth.POST("/login", c.Login)
		auth.GET("/identity", c.UserIdentity, c.GetUserInfo)

	}
	dep := router.Group("/departments")
	{
		dep.GET("/all", c.GetAllDepartments)
	}
	teams := router.Group("/teams")
	{
		teams.GET("/one/:id", c.GetTeamByID)
		teams.GET("/:depID", c.GetAllTeamsByDepartment)
	}
	members := router.Group("/members")
	{
		members.GET("/all", c.GetAllMembers)
		members.GET("/:id", c.GetOneMember)
		members.PUT("/:id", c.UpdateMemberDetails)
		members.DELETE("/:id", c.DeleteMemberDetails)
	}
	log.Fatal(router.Run(":6969"))
}
