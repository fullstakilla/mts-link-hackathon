-- +goose Up
-- +goose StatementBegin
ALTER TABLE members ADD COLUMN status text NOT NULL DEFAULT 'Работает';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
