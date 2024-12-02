-- +goose Up
-- +goose StatementBegin
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE departments (
                             id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                             name TEXT NOT NULL,
                             teams_count INT NOT NULL DEFAULT 0,
                             employees_count INT NOT NULL DEFAULT 0
);

CREATE TABLE teams (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       name TEXT NOT NULL,
                       department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE members (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                         fullname TEXT NOT NULL,
                         team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
                         age INT NOT NULL,
                         role TEXT NOT NULL,
                         photo_url TEXT
);

CREATE TABLE member_details (
                                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
                                key TEXT NOT NULL,
                                value TEXT NOT NULL
);

CREATE TABLE users (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       username TEXT NOT NULL UNIQUE,
                       password TEXT NOT NULL
);

CREATE INDEX idx_members_team_id ON members(team_id);
CREATE INDEX idx_member_details_member_id ON member_details(member_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP INDEX IF EXISTS idx_member_details_member_id;
DROP INDEX IF EXISTS idx_members_team_id;

DROP TABLE IF EXISTS member_details CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS users CASCADE;
-- +goose StatementEnd
