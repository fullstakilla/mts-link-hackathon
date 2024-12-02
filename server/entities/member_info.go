package entities

import "github.com/google/uuid"

type Member struct {
	ID       uuid.UUID       `json:"id" db:"id"`
	Email    string          `json:"email" db:"email"`
	Password string          `json:"password" db:"password"`
	Fullname string          `json:"fullname" db:"fullname"`
	TeamID   uuid.UUID       `json:"teamID,omitempty" db:"team_id"`
	Status   string          `json:"status" db:"status"`
	Team     Team            `json:"team,omitempty" db:"team"`
	Age      int             `json:"age" db:"age"`
	Role     string          `json:"role" db:"role"`
	PhotoURL string          `json:"photoURL" db:"photo_url"`
	Details  []MemberDetails `json:"details" db:"details"`
}

type MemberDetails struct {
	MemberID uuid.UUID `db:"member_id"`
	Key      string
	Value    string
}
