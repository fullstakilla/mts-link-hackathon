-- +goose Up
-- +goose StatementBegin
INSERT INTO member_details (member_id, key, value) VALUES
                                                       ((SELECT id FROM members WHERE fullname = 'Анна Иванова'), 'email', 'anna.ivanova@example.com'),
                                                       ((SELECT id FROM members WHERE fullname = 'Анна Иванова'), 'опыт', '5 лет'),
                                                       ((SELECT id FROM members WHERE fullname = 'Иван Петров'), 'email', 'ivan.petrov@example.com'),
                                                       ((SELECT id FROM members WHERE fullname = 'Иван Петров'), 'опыт', '8 лет');

-- Участники Финансовой команды
INSERT INTO member_details (member_id, key, value) VALUES
                                                       ((SELECT id FROM members WHERE fullname = 'Светлана Смирнова'), 'email', 'svetlana.smirnova@example.com'),
                                                       ((SELECT id FROM members WHERE fullname = 'Светлана Смирнова'), 'опыт', '10 лет'),
                                                       ((SELECT id FROM members WHERE fullname = 'Дмитрий Соколов'), 'email', 'dmitry.sokolov@example.com'),
                                                       ((SELECT id FROM members WHERE fullname = 'Дмитрий Соколов'), 'опыт', '6 лет');

-- Участники IT-отдела: Разработка ПО
INSERT INTO member_details (member_id, key, value) VALUES
                                                       ((SELECT id FROM members WHERE fullname = 'Молчанов Иван'), 'email', 'ivan.molchanov@example.com'),
                                                       ((SELECT id FROM members WHERE fullname = 'Молчанов Иван'), 'опыт', '4 года'),
                                                       ((SELECT id FROM members WHERE fullname = 'Алексей Кузнецов'), 'email', 'alexey.kuznetsov@example.com'),
                                                       ((SELECT id FROM members WHERE fullname = 'Алексей Кузнецов'), 'опыт', '7 лет');

-- Участники IT-отдела: Техническая поддержка
INSERT INTO member_details (member_id, key, value) VALUES
                                                       ((SELECT id FROM members WHERE fullname = 'Михаил Федоров'), 'email', 'mikhail.fedorov@example.com'),
                                                       ((SELECT id FROM members WHERE fullname = 'Михаил Федоров'), 'опыт', '12 лет'),
                                                       ((SELECT id FROM members WHERE fullname = 'Ольга Власова'), 'email', 'olga.vlasova@example.com'),
                                                       ((SELECT id FROM members WHERE fullname = 'Ольга Власова'), 'опыт', '4 года');

-- Участники HR-отдела
INSERT INTO member_details (member_id, key, value) VALUES
                                                       ((SELECT id FROM members WHERE fullname = 'Мария Крылова'), 'email', 'maria.krylova@example.com'),
                                                       ((SELECT id FROM members WHERE fullname = 'Мария Крылова'), 'опыт', '3 года'),
                                                       ((SELECT id FROM members WHERE fullname = 'Николай Сорокин'), 'email', 'nikolay.sorokin@example.com'),
                                                       ((SELECT id FROM members WHERE fullname = 'Николай Сорокин'), 'опыт', '6 лет');

-- Участники Юридического отдела
INSERT INTO member_details (member_id, key, value) VALUES
                                                       ((SELECT id FROM members WHERE fullname = 'Олег Павлов'), 'email', 'oleg.pavlov@example.com'),
                                                       ((SELECT id FROM members WHERE fullname = 'Олег Павлов'), 'опыт', '20 лет'),
                                                       ((SELECT id FROM members WHERE fullname = 'Лидия Андреева'), 'email', 'lidia.andreeva@example.com'),
                                                       ((SELECT id FROM members WHERE fullname = 'Лидия Андреева'), 'опыт', '15 лет');

-- Участники Бухгалтерии
INSERT INTO member_details (member_id, key, value) VALUES
                                                       ((SELECT id FROM members WHERE fullname = 'Татьяна Егорова'), 'email', 'tatiana.egorova@example.com'),
                                                       ((SELECT id FROM members WHERE fullname = 'Татьяна Егорова'), 'опыт', '25 лет'),
                                                       ((SELECT id FROM members WHERE fullname = 'Сергей Матвеев'), 'email', 'sergey.matveev@example.com'),
                                                       ((SELECT id FROM members WHERE fullname = 'Сергей Матвеев'), 'опыт', '12 лет');
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
delete from member_details;
-- +goose StatementEnd
