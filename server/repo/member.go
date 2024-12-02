package repo

import (
	"context"
	"find/entities"
	"fmt"
	"github.com/google/uuid"
	"strings"
)

func (r Repo) CreateMember(ctx context.Context, m entities.Member) (string, error) {
	var id string
	query := "INSERT INTO members (fullname, team_id, age, role, photo_url, password, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id"
	row := r.db.QueryRowContext(ctx, query, m.Fullname, m.TeamID, m.Age, m.Role, m.PhotoURL, m.Password, m.Email)
	if err := row.Scan(&id); err != nil {
		return "", err
	}
	return id, nil
}

func (r Repo) GetMemberById(ctx context.Context, id string) (entities.Member, error) {
	var member entities.Member

	// Получаем основную информацию о члене
	queryMember := `SELECT members.id, fullname, team_id, age, role, photo_url, status,
       t.name as "team.name",t.id as "team.id",email, d.name as "team.department_name", t.department_id as "team.department_id"
       FROM members 
                                                   JOIN teams t on t.id = members.team_id
       												JOIN departments d on d.id = t.department_id
                                                   WHERE members.id = $1`
	err := r.db.GetContext(ctx, &member, queryMember, id)
	if err != nil {
		return member, err
	}

	// Получаем связанные детали
	queryDetails := "SELECT member_id, key, value FROM member_details WHERE member_id = $1"
	var details []entities.MemberDetails
	err = r.db.SelectContext(ctx, &details, queryDetails, id)
	if err != nil {
		return member, err
	}

	// Присваиваем детали члену
	member.Details = details

	return member, nil
}

func (r Repo) GetAllMembers(ctx context.Context, dets []string) ([]entities.Member, error) {
	var members []entities.Member

	// Получение основной информации о членах
	queryMembers := "SELECT * FROM members"
	err := r.db.SelectContext(ctx, &members, queryMembers)
	if err != nil {
		return nil, err
	}

	// Создаем карту для связывания members с их details
	memberDetailsMap := make(map[uuid.UUID][]entities.MemberDetails)

	// Получение всех деталей
	queryDetails := "SELECT member_id, value, key FROM member_details"
	var details []entities.MemberDetails
	err = r.db.SelectContext(ctx, &details, queryDetails)
	if err != nil {
		return nil, err
	}

	// Группируем details по MemberID
	for _, detail := range details {
		memberDetailsMap[detail.MemberID] = append(memberDetailsMap[detail.MemberID], detail)
	}

	// Создаем результирующий список для фильтрованных пользователей
	var filteredMembers []entities.Member

	// Связываем details с членами и фильтруем их
	for i := range members {
		members[i].Details = memberDetailsMap[members[i].ID]

		// Проверяем совпадение с `dets`
		if matchesCriteria(members[i], dets) {
			filteredMembers = append(filteredMembers, members[i])
		}
	}

	return filteredMembers, nil
}

func matchesCriteria(member entities.Member, dets []string) bool {
	var check = make(map[string]string)
	for _, det := range dets {
		if containsIgnoreCase(member.Fullname, det) ||
			fmt.Sprintf("%d", member.Age) == det ||
			containsIgnoreCase(member.Role, det) {
			check[det] = struct{}{}
		}
	}

	// Проверка совпадения в details
	for _, memberDetail := range member.Details {
		for _, det := range dets {
			if containsIgnoreCase(memberDetail.Key, det) ||
				containsIgnoreCase(memberDetail.Value, det) {
				check[det] = struct{}{}
			}
		}
	}
	if len(check) != len(dets) {
		return false
	}
	return true
}

func containsIgnoreCase(source, substr string) bool {
	source = strings.ToLower(source)
	substr = strings.ToLower(substr)
	return strings.Contains(source, substr)
}

func (r Repo) UpdateMember(ctx context.Context, id string, m entities.Member) error {
	tx, err := r.db.BeginTxx(ctx, nil)
	if err != nil {
		return err
	}

	queryMember := "UPDATE members SET fullname = $1, team_id = $2, age = $3, role = $4, photo_url = $5, status = $6 WHERE id = $7"
	_, err = tx.ExecContext(ctx, queryMember, m.Fullname, m.TeamID, m.Age, m.Role, m.PhotoURL, m.Status, id)
	if err != nil {
		tx.Rollback()
		return err
	}

	queryDeleteDetails := "DELETE FROM member_details WHERE member_id = $1"
	_, err = tx.ExecContext(ctx, queryDeleteDetails, id)
	if err != nil {
		tx.Rollback()
		return err
	}

	queryInsertDetails := "INSERT INTO member_details (member_id, key, value) VALUES ($1, $2, $3)"
	for _, detail := range m.Details {
		_, err = tx.ExecContext(ctx, queryInsertDetails, id, detail.Key, detail.Value)
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	return tx.Commit()
}

func (r Repo) DeleteMemberById(ctx context.Context, id string) error {
	query := "DELETE FROM members WHERE id = $1"
	_, err := r.db.ExecContext(ctx, query, id)
	return err
}
