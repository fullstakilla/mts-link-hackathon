package repo

import (
	"context"
	"find/entities"
)

func (r Repo) CreateDepartment(ctx context.Context, d entities.Department) (string, error) {
	var id string
	query := "INSERT INTO departments (name, teams_count, employees_count) VALUES ($1, $2, $3) RETURNING id"
	row := r.db.QueryRowContext(ctx, query, d.Name, d.TeamsCount, d.EmployeesCount)
	if err := row.Scan(&id); err != nil {
		return "", err
	}
	return id, nil
}

func (r Repo) GetDepartmentById(ctx context.Context, id string) (entities.Department, error) {
	var department entities.Department
	query := "SELECT * FROM departments WHERE id = $1"
	err := r.db.GetContext(ctx, &department, query, id)
	return department, err
}

func (r Repo) GetAllDepartments(ctx context.Context) ([]entities.Department, error) {
	var departments []entities.Department
	query := `
SELECT 
    d.id AS id,
    d.name AS name,
    COUNT(DISTINCT t.id) AS teams_count,
    COUNT(m.id) AS employees_count
FROM 
    departments d
LEFT JOIN 
    teams t ON d.id = t.department_id
LEFT JOIN 
    members m ON t.id = m.team_id
GROUP BY 
    d.id, d.name;
`
	err := r.db.SelectContext(ctx, &departments, query)
	return departments, err
}

func (r Repo) UpdateDepartment(ctx context.Context, id string, d entities.Department) error {
	query := "UPDATE departments SET name = $1, teams_count = $2, employees_count = $3 WHERE id = $4"
	_, err := r.db.ExecContext(ctx, query, d.Name, d.TeamsCount, d.EmployeesCount, id)
	return err
}

func (r Repo) DeleteDepartmentById(ctx context.Context, id string) error {
	query := "DELETE FROM departments WHERE id = $1"
	_, err := r.db.ExecContext(ctx, query, id)
	return err
}
