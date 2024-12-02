package repo

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"os"
)

type Repo struct {
	db *sqlx.DB
}

func newDBConnection() *sqlx.DB {
	var db *sqlx.DB

	db, err := sqlx.Connect("postgres", fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=%s",
		os.Getenv("PG_USR"), os.Getenv("PG_PWD"), os.Getenv("PG_HOST"), 5432, os.Getenv("PG_DB"), "disable"))

	if err != nil {
		panic(err.Error())
	}

	return db
}

func New() *Repo {
	return &Repo{
		db: newDBConnection(),
	}
}
