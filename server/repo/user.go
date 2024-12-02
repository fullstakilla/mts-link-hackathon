package repo

import (
	"context"
	"find/entities"
	"github.com/google/uuid"
)

func (r Repo) CreateUser(ctx context.Context, u entities.User) (uuid.UUID, error) {
	var id uuid.UUID
	query := "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id"
	row := r.db.QueryRowContext(ctx, query, u.Username, u.Password)
	if err := row.Scan(&id); err != nil {
		return id, err
	}
	return id, nil

}

func (r Repo) GetAllUsers(ctx context.Context) ([]entities.User, error) {
	var users []entities.User
	query := "SELECT * FROM users"
	err := r.db.SelectContext(ctx, &users, query)
	return users, err
}

func (r Repo) GetUserByCredentials(ctx context.Context, email, password string) (entities.Member, error) {
	var user entities.Member
	query := "SELECT * FROM members WHERE email = $1 AND password = $2"
	err := r.db.GetContext(ctx, &user, query, email, password)
	return user, err
}

func (r Repo) GetUserById(ctx context.Context, id string) (entities.User, error) {
	var user entities.User
	query := "SELECT * FROM users WHERE id = $1"
	err := r.db.GetContext(ctx, &user, query, id)
	return user, err
}

func (r Repo) DeleteUserById(ctx context.Context, id int) error {
	query := "DELETE FROM users WHERE id = $1"
	_, err := r.db.ExecContext(ctx, query, id)
	return err
}
