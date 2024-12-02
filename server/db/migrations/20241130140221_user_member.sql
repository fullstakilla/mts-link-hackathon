-- +goose Up
-- +goose StatementBegin
ALTER TABLE members
    ADD COLUMN password TEXT NOT NULL default 'strongpassword',
    ADD COLUMN email TEXT NOT NULL default 'email@example.com';

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
