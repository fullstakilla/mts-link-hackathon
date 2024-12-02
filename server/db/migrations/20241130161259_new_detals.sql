-- +goose Up
-- +goose StatementBegin
INSERT INTO member_details (member_id, key, value) VALUES
                                                       ((SELECT id FROM members WHERE fullname = 'Анна Иванова'), 'хобби', 'Путешествия'),
                                                       ((SELECT id FROM members WHERE fullname = 'Анна Иванова'), 'навык', 'Управление клиентами'),
                                                       ((SELECT id FROM members WHERE fullname = 'Анна Иванова'), 'интерес', 'Фотография'),
                                                       ((SELECT id FROM members WHERE fullname = 'Иван Петров'), 'хобби', 'Шахматы'),
                                                       ((SELECT id FROM members WHERE fullname = 'Иван Петров'), 'навык', 'Переговоры'),
                                                       ((SELECT id FROM members WHERE fullname = 'Иван Петров'), 'интерес', 'Инвестиции');

-- Участники Финансовой команды
INSERT INTO member_details (member_id, key, value) VALUES
                                                       ((SELECT id FROM members WHERE fullname = 'Светлана Смирнова'), 'хобби', 'Чтение'),
                                                       ((SELECT id FROM members WHERE fullname = 'Светлана Смирнова'), 'навык', 'Финансовое планирование'),
                                                       ((SELECT id FROM members WHERE fullname = 'Светлана Смирнова'), 'интерес', 'Кулинария'),
                                                       ((SELECT id FROM members WHERE fullname = 'Дмитрий Соколов'), 'хобби', 'Бег'),
                                                       ((SELECT id FROM members WHERE fullname = 'Дмитрий Соколов'), 'навык', 'Бюджетирование'),
                                                       ((SELECT id FROM members WHERE fullname = 'Дмитрий Соколов'), 'интерес', 'Горные лыжи');

-- Участники IT-отдела: Разработка ПО
INSERT INTO member_details (member_id, key, value) VALUES
                                                       ((SELECT id FROM members WHERE fullname = 'Молчанов Иван'), 'хобби', 'Рыбалка'),
                                                       ((SELECT id FROM members WHERE fullname = 'Молчанов Иван'), 'навык', 'Программирование на Python'),
                                                       ((SELECT id FROM members WHERE fullname = 'Молчанов Иван'), 'интерес', 'Разработка игр'),
                                                       ((SELECT id FROM members WHERE fullname = 'Алексей Кузнецов'), 'хобби', 'Скалолазание'),
                                                       ((SELECT id FROM members WHERE fullname = 'Алексей Кузнецов'), 'навык', 'Микросервисы'),
                                                       ((SELECT id FROM members WHERE fullname = 'Алексей Кузнецов'), 'интерес', 'Open Source проекты');

-- Участники IT-отдела: Техническая поддержка
INSERT INTO member_details (member_id, key, value) VALUES
                                                       ((SELECT id FROM members WHERE fullname = 'Михаил Федоров'), 'хобби', 'Настольные игры'),
                                                       ((SELECT id FROM members WHERE fullname = 'Михаил Федоров'), 'навык', 'Администрирование систем'),
                                                       ((SELECT id FROM members WHERE fullname = 'Михаил Федоров'), 'интерес', 'Кибербезопасность'),
                                                       ((SELECT id FROM members WHERE fullname = 'Ольга Власова'), 'хобби', 'Пение'),
                                                       ((SELECT id FROM members WHERE fullname = 'Ольга Власова'), 'навык', 'Поддержка пользователей'),
                                                       ((SELECT id FROM members WHERE fullname = 'Ольга Власова'), 'интерес', 'Психология');

-- Участники HR-отдела
INSERT INTO member_details (member_id, key, value) VALUES
                                                       ((SELECT id FROM members WHERE fullname = 'Мария Крылова'), 'хобби', 'Флористика'),
                                                       ((SELECT id FROM members WHERE fullname = 'Мария Крылова'), 'навык', 'Подбор персонала'),
                                                       ((SELECT id FROM members WHERE fullname = 'Мария Крылова'), 'интерес', 'Ландшафтный дизайн'),
                                                       ((SELECT id FROM members WHERE fullname = 'Николай Сорокин'), 'хобби', 'Кулинария'),
                                                       ((SELECT id FROM members WHERE fullname = 'Николай Сорокин'), 'навык', 'Мотивация сотрудников'),
                                                       ((SELECT id FROM members WHERE fullname = 'Николай Сорокин'), 'интерес', 'История');

-- Участники Юридического отдела
INSERT INTO member_details (member_id, key, value) VALUES
                                                       ((SELECT id FROM members WHERE fullname = 'Олег Павлов'), 'хобби', 'Фотография'),
                                                       ((SELECT id FROM members WHERE fullname = 'Олег Павлов'), 'навык', 'Корпоративное право'),
                                                       ((SELECT id FROM members WHERE fullname = 'Олег Павлов'), 'интерес', 'Путешествия'),
                                                       ((SELECT id FROM members WHERE fullname = 'Лидия Андреева'), 'хобби', 'Вышивание'),
                                                       ((SELECT id FROM members WHERE fullname = 'Лидия Андреева'), 'навык', 'Судебные дела'),
                                                       ((SELECT id FROM members WHERE fullname = 'Лидия Андреева'), 'интерес', 'Классическая музыка');

-- Участники Бухгалтерии
INSERT INTO member_details (member_id, key, value) VALUES
                                                       ((SELECT id FROM members WHERE fullname = 'Татьяна Егорова'), 'хобби', 'Йога'),
                                                       ((SELECT id FROM members WHERE fullname = 'Татьяна Егорова'), 'навык', 'Анализ затрат'),
                                                       ((SELECT id FROM members WHERE fullname = 'Татьяна Егорова'), 'интерес', 'Инвестиции'),
                                                       ((SELECT id FROM members WHERE fullname = 'Сергей Матвеев'), 'хобби', 'Футбол'),
                                                       ((SELECT id FROM members WHERE fullname = 'Сергей Матвеев'), 'навык', 'Налоговое планирование'),
                                                       ((SELECT id FROM members WHERE fullname = 'Сергей Матвеев'), 'интерес', 'Электроника');
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
