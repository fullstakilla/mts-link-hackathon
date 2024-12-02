package entities

import "github.com/google/uuid"

type Department struct {
	ID             uuid.UUID `json:"id" db:"id"`
	Name           string    `json:"name" db:"name"`
	TeamsCount     int       `json:"teamsCount" db:"teams_count"`
	EmployeesCount int       `json:"employeesCount" db:"employees_count"`
}
