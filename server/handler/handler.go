package handler

import (
	"find/repo"
)

type Handler struct {
	storage *repo.Repo
}

func New(db *repo.Repo) *Handler {
	return &Handler{storage: db}
}
