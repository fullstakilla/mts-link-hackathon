package repo

import (
	"context"
	"database/sql"
	"find/entities"
	"fmt"
	"github.com/google/uuid"
)

func (r Repo) CreateTeam(ctx context.Context, t entities.Team) (string, error) {
	var id string
	query := "INSERT INTO teams (name, department_id) VALUES ($1, $2) RETURNING id"
	row := r.db.QueryRowContext(ctx, query, t.Name, t.DepartmentID)
	if err := row.Scan(&id); err != nil {
		return "", err
	}
	return id, nil
}

func (r Repo) GetTeamsByDepartment(ctx context.Context, departmentID uuid.UUID) ([]entities.Team, *entities.Department, error) {
	var teams []entities.Team
	var dep entities.Department
	q := `SELECT id,name from departments where id = $1`
	err := r.db.GetContext(ctx, &dep, q, departmentID)
	query := `
		SELECT 
			t.id AS team_id,
			t.name AS team_name,
			t.department_id AS department_id,
			m.id AS member_id,
			m.fullname AS member_fullname,
			m.status as member_status,
			m.age AS member_age,
			m.role AS member_role,
			m.photo_url AS member_photo_url,
			md.key AS detail_key,
			md.value AS detail_value
		FROM teams t
		LEFT JOIN members m ON t.id = m.team_id
		LEFT JOIN member_details md ON m.id = md.member_id
		WHERE t.department_id = $1
		ORDER BY t.id, m.id;
	`

	rows, err := r.db.QueryxContext(ctx, query, departmentID)
	if err != nil {
		return nil, nil, err
	}
	defer rows.Close()

	// Map for teams and members to avoid duplication
	teamsMap := make(map[uuid.UUID]*entities.Team)
	membersMap := make(map[uuid.UUID]*entities.Member)

	// Iterate through the rows
	for rows.Next() {
		var teamID, memberID uuid.UUID
		var teamName, memberFullname, memberRole, memberPhotoURL, memberStatus sql.NullString
		var memberAge int
		var detailKey, detailValue sql.NullString

		// Scan the row into variables
		if err := rows.Scan(
			&teamID, &teamName, &departmentID,
			&memberID, &memberFullname, &memberStatus, &memberAge, &memberRole, &memberPhotoURL,
			&detailKey, &detailValue,
		); err != nil {
			return nil, nil, err
		}

		// Initialize team in the map if not already
		if _, ok := teamsMap[teamID]; !ok {
			teamsMap[teamID] = &entities.Team{
				ID:           teamID,
				Name:         teamName.String,
				DepartmentID: departmentID,
				Members:      []*entities.Member{},
			}
		}

		// Initialize member if not already
		member, exists := membersMap[memberID]
		if !exists {
			member = &entities.Member{
				ID:       memberID,
				Fullname: memberFullname.String,
				Status:   memberStatus.String,
				Age:      memberAge,
				Role:     memberRole.String,
				PhotoURL: memberPhotoURL.String,
				Details:  []entities.MemberDetails{}, // Initialize empty details
			}
		}

		// Append the detail if valid
		if detailKey.Valid && detailValue.Valid {
			member.Details = append(member.Details, entities.MemberDetails{
				Key:   detailKey.String,
				Value: detailValue.String,
			})
		}
		// Update the member in the map
		membersMap[memberID] = member
		// Append the member to the corresponding team if not already added
		if !containsMember(teamsMap[teamID].Members, memberID) {
			teamsMap[teamID].Members = append(teamsMap[teamID].Members, member)
		}
	}

	// Convert map to slice of teams
	for _, team := range teamsMap {
		teams = append(teams, *team)
	}

	if err := rows.Err(); err != nil {
		return nil, nil, err
	}

	return teams, &dep, nil
}

// Helper function to check if member is already added to the team
func containsMember(members []*entities.Member, memberID uuid.UUID) bool {
	for _, m := range members {
		if m.ID == memberID {
			return true
		}
	}
	return false
}

func (r Repo) GetAllTeams(ctx context.Context) ([]entities.Team, error) {
	var teams []entities.Team
	query := "SELECT * FROM teams"
	err := r.db.SelectContext(ctx, &teams, query)
	return teams, err
}

func (r Repo) UpdateTeam(ctx context.Context, id string, t entities.Team) error {
	query := "UPDATE teams SET name = $1, department_id = $2 WHERE id = $3"
	_, err := r.db.ExecContext(ctx, query, t.Name, t.DepartmentID, id)
	return err
}

func (r Repo) DeleteTeamById(ctx context.Context, id string) error {
	query := "DELETE FROM teams WHERE id = $1"
	_, err := r.db.ExecContext(ctx, query, id)
	return err
}

func (r Repo) GetTeamByID(ctx context.Context, teamID uuid.UUID) (*entities.Team, *entities.Department, error) {
	var team entities.Team
	var dep entities.Department

	// Получение информации о департаменте
	qDep := `SELECT id, name FROM departments WHERE id = (
		SELECT department_id FROM teams WHERE id = $1
	)`
	err := r.db.GetContext(ctx, &dep, qDep, teamID)
	if err != nil {
		return nil, nil, err
	}

	// Запрос для получения команды, членов и их деталей
	query := `
		SELECT 
			t.id AS team_id,
			t.name AS team_name,
			t.department_id AS department_id,
			m.id AS member_id,
			m.fullname AS member_fullname,
			m.status as member_status,
			m.age AS member_age,
			m.role AS member_role,
			m.photo_url AS member_photo_url,
			md.key AS detail_key,
			md.value AS detail_value
		FROM teams t
		LEFT JOIN members m ON t.id = m.team_id
		LEFT JOIN member_details md ON m.id = md.member_id
		WHERE t.id = $1
		ORDER BY t.id, m.id;
	`

	rows, err := r.db.QueryxContext(ctx, query, teamID)
	if err != nil {
		return nil, nil, err
	}
	defer rows.Close()

	// Карты для предотвращения дублирования членов
	membersMap := make(map[uuid.UUID]*entities.Member)

	// Итерация по строкам результата
	for rows.Next() {
		var teamID, memberID uuid.UUID
		var teamName, memberFullname, memberRole, memberPhotoURL, memberStatus sql.NullString
		var departmentID uuid.UUID
		var memberAge int
		var detailKey, detailValue sql.NullString

		// Сканируем строку в переменные
		if err := rows.Scan(
			&teamID, &teamName, &departmentID,
			&memberID, &memberFullname, &memberStatus, &memberAge, &memberRole, &memberPhotoURL,
			&detailKey, &detailValue,
		); err != nil {
			return nil, nil, err
		}

		// Устанавливаем основную информацию о команде
		team.ID = teamID
		team.Name = teamName.String
		team.DepartmentID = departmentID
		if team.Members == nil {
			team.Members = []*entities.Member{}
		}

		// Инициализация участника, если еще не существует
		member, exists := membersMap[memberID]
		if !exists && memberID != uuid.Nil { // Пропускаем, если у команды нет участников
			fmt.Println(memberStatus.String)
			member = &entities.Member{
				ID:       memberID,
				Fullname: memberFullname.String,
				Status:   memberStatus.String,
				Age:      memberAge,
				Role:     memberRole.String,
				PhotoURL: memberPhotoURL.String,
				Details:  []entities.MemberDetails{},
			}
			membersMap[memberID] = member
		}

		// Добавляем детали, если они существуют
		if detailKey.Valid && detailValue.Valid {
			member.Details = append(member.Details, entities.MemberDetails{
				Key:   detailKey.String,
				Value: detailValue.String,
			})
		}

		// Добавляем участника в команду, если он еще не добавлен
		if memberID != uuid.Nil && !containsMember(team.Members, memberID) {
			team.Members = append(team.Members, member)
		}
	}

	// Проверяем ошибки при итерации
	if err := rows.Err(); err != nil {
		return nil, nil, err
	}

	return &team, &dep, nil
}
