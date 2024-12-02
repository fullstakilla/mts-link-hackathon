package entities

import "github.com/google/uuid"

type Team struct {
	ID             uuid.UUID `json:"id" db:"id"`
	Members        []*Member `json:"members,omitempty" db:"members"`
	Name           string    `json:"name" db:"name"`
	DepartmentID   uuid.UUID `json:"departmentID,omitempty" db:"department_id"`
	DepartmentName string    `json:"departmentName,omitempty" db:"department_name"`
}
