package handler

import (
	"find/entities"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

func (h *Handler) GetOneMember(c *gin.Context) {
	id := c.Param("id")
	member, err := h.storage.GetMemberById(c, id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, member)
}

func (h *Handler) GetAllMembers(c *gin.Context) {
	details := c.Query("details")
	split := strings.Split(details, " ")
	members, err := h.storage.GetAllMembers(c, split)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, members)
}

func (h *Handler) UpdateMemberDetails(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		newErrorResponse(c, http.StatusBadRequest, "Member ID is required")
		return
	}

	var memz entities.Member
	if err := c.ShouldBindJSON(&memz); err != nil {
		newErrorResponse(c, http.StatusBadRequest, "Invalid JSON data")
		return
	}

	err := h.storage.UpdateMember(c, id, memz)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Member details updated successfully"})
}

func (h *Handler) DeleteMemberDetails(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		newErrorResponse(c, http.StatusBadRequest, "Member ID is required")
		return
	}

	err := h.storage.DeleteMemberById(c, id)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Member details deleted successfully"})
}
