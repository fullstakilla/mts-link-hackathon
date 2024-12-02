package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
)

func (h *Handler) GetAllTeamsByDepartment(ctx *gin.Context) {
	id := ctx.Param("depID")
	if id == "" {
		newErrorResponse(ctx, http.StatusBadRequest, "АЙДИШНИК ВВЕДИ")
		return
	}
	departmentID, err := uuid.Parse(id)
	if err != nil {
		newErrorResponse(ctx, http.StatusBadRequest, "АЙДИШНИК плохой")

		return
	}
	teams, dep, err := h.storage.GetTeamsByDepartment(ctx, departmentID)
	if err != nil {
		newErrorResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, map[string]interface{}{
		"departmentName": dep.Name,
		"departmentID":   dep.ID.String(),
		"teams":          teams,
	})
}

func (h *Handler) GetTeamByID(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		newErrorResponse(ctx, http.StatusBadRequest, "АЙДИШНИК ВВЕДИ")
		return
	}
	ID, err := uuid.Parse(id)
	if err != nil {
		newErrorResponse(ctx, http.StatusBadRequest, "АЙДИШНИК плохой")

		return
	}
	teams, dep, err := h.storage.GetTeamByID(ctx, ID)
	if err != nil {
		newErrorResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}
	ctx.JSON(http.StatusOK, map[string]interface{}{
		"departmentName": dep.Name,
		"departmentID":   dep.ID.String(),
		"members":        teams,
	})
}
