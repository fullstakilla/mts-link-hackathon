package handler

import (
	"context"
	"crypto/sha1"
	"errors"
	"find/entities"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
	"net/http"
	"os"
	"time"
)

type tokenClaims struct {
	jwt.StandardClaims
	UserID string `json:"userID"`
}

var (
	salt       = os.Getenv("SALT")
	tokenTTL   = 120 * time.Hour
	signingKey = os.Getenv("SIGNING_KEY")
)

// Register godoc
// @Summary      Register a new user
// @Description  Create a new user account and generate a JWT token.
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        input  body      signupReq  true  "User credentials"
// @Success      200    {object}  map[string]interface{}  "token"="JWT token"
// @Failure      400    {object}  map[string]string "error"="Bad request"
// @Failure      500    {object}  map[string]string "error"="Internal server error"
// @Router       /api/v1/auth/signup [post]
func (h *Handler) Register(c *gin.Context) {
	var input signupReq
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	ll, _ := uuid.Parse(input.TeamID)
	user := entities.Member{
		Email:    input.Email,
		Password: input.Password,
		Fullname: input.Fullname,
		TeamID:   ll,
		Age:      input.Age,
		Role:     input.Role,
		PhotoURL: input.PhotoURL,
		Details:  nil,
	}
	user.Password = generatePasswordHash(user.Password)
	_, err := h.storage.CreateMember(c, user)
	if err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	token, err := h.generateToken(c, input.Email, input.Password)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"token": token,
	})
}

type signupReq struct {
	Email    string `json:"email" db:"email"`
	Password string `json:"password" db:"password"`
	Fullname string `json:"fullname" db:"fullname"`
	TeamID   string `json:"teamID,omitempty" db:"team_id"`
	Age      int    `json:"age" db:"age"`
	Role     string `json:"role" db:"role"`
	PhotoURL string `json:"photoURL" db:"photo_url"`
}

type loginReq struct {
	Login    string `json:"login" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// Login godoc
// @Summary      Log in a user
// @Description  Authenticate a user and generate a JWT token.
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        input  body      loginReq  true  "User credentials"
// @Success      200    {object}  map[string]interface{}  "token"="JWT token"
// @Failure      400    {object}  map[string]string "error"="Bad request"
// @Failure      500    {object}  map[string]string "error"="Internal server error"
// @Router       /api/v1/auth/login [post]
func (h *Handler) Login(c *gin.Context) {
	var input loginReq

	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	token, err := h.generateToken(c, input.Login, input.Password)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"token": token,
	})
}

// GetUserInfo godoc
// @Summary      Get user information
// @Description  Retrieve detailed information about the authenticated user.
// @Tags         auth
// @Accept       json
// @Produce      json
// @Success      200    {object}  map[string]interface{}  "User details"
// @Failure      401    {object}  map[string]string "error"="Unauthorized"
// @Failure      500    {object}  map[string]string "error"="Internal server error"
// @Router       /api/v1/auth/identity [get]
// @Security     ApiKeyAuth
func (h *Handler) GetUserInfo(c *gin.Context) {
	userId, ok := c.Get("userID")
	if !ok {
		newErrorResponse(c, http.StatusUnauthorized, "user is unauthorized")
		return
	}
	info, err := h.storage.GetMemberById(c, userId.(string))
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	info.Password = ""
	c.JSON(http.StatusOK, info)
}

func generatePasswordHash(password string) string {
	hash := sha1.New()
	hash.Write([]byte(password))

	return fmt.Sprintf("%x", hash.Sum([]byte(salt)))
}

func (h *Handler) generateToken(ctx context.Context, login, password string) (string, error) {
	user, err := h.storage.GetUserByCredentials(ctx, login, generatePasswordHash(password))
	if err != nil {
		return "", err
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &tokenClaims{
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(tokenTTL).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
		user.ID.String(),
	})

	return token.SignedString([]byte(signingKey))
}

func parseToken(ctx context.Context, accessToken string) (string, error) {
	token, err := jwt.ParseWithClaims(accessToken, &tokenClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}

		return []byte(signingKey), nil
	})
	if err != nil {
		return "", err
	}
	claims, ok := token.Claims.(*tokenClaims)
	if !ok {
		return "", errors.New("token claims are not of type *tokenClaims")
	}
	return claims.UserID, nil
}
