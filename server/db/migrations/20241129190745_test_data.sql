-- +goose Up
-- +goose StatementBegin
insert into departments (name) values
                                                                     ('Отдел маркетинга'),
                                                                     ('Отдел финансов'),
                                                                     ('Отдел IT'),
                                                                     ('Отдел HR'),
                                                                     ('Отдел Юридических вопросов'),
                                                                     ('Отдел Бугалтерии');

INSERT INTO teams (name, department_id) VALUES
                                            ('Маркетинговая стратегия', (SELECT id FROM departments WHERE name = 'Отдел маркетинга')),
                                            ('Финансовый анализ', (SELECT id FROM departments WHERE name = 'Отдел финансов')),
                                            ('Разработка ПО', (SELECT id FROM departments WHERE name = 'Отдел IT')),
                                            ('Техническая поддержка', (SELECT id FROM departments WHERE name = 'Отдел IT')),
                                            ('Подбор персонала', (SELECT id FROM departments WHERE name = 'Отдел HR')),
                                            ('Юридические консультации', (SELECT id FROM departments WHERE name = 'Отдел Юридических вопросов')),
                                            ('Бухгалтерский учет', (SELECT id FROM departments WHERE name = 'Отдел Бугалтерии'));


INSERT INTO members (fullname, team_id, age, role, photo_url) VALUES
                                                                  -- Участники Маркетинговой команды
                                                                  ('Анна Иванова', (SELECT id FROM teams WHERE name = 'Маркетинговая стратегия'), 29, 'Маркетолог', ''),
                                                                  ('Иван Петров', (SELECT id FROM teams WHERE name = 'Маркетинговая стратегия'), 34, 'Старший маркетолог', ''),

                                                                  -- Участники Финансовой команды
                                                                  ('Светлана Смирнова', (SELECT id FROM teams WHERE name = 'Финансовый анализ'), 40, 'Финансовый аналитик', ''),
                                                                  ('Дмитрий Соколов', (SELECT id FROM teams WHERE name = 'Финансовый анализ'), 31, 'Бухгалтер', ''),

                                                                  -- Участники IT-отдела: Разработка ПО
                                                                  ('Молчанов Иван', (SELECT id FROM teams WHERE name = 'Разработка ПО'), 26, 'Разработчик', ''),
                                                                  ('Алексей Кузнецов', (SELECT id FROM teams WHERE name = 'Разработка ПО'), 28, 'Ведущий разработчик', ''),

                                                                  -- Участники IT-отдела: Техническая поддержка
                                                                  ('Михаил Федоров', (SELECT id FROM teams WHERE name = 'Техническая поддержка'), 35, 'Системный администратор', ''),
                                                                  ('Ольга Власова', (SELECT id FROM teams WHERE name = 'Техническая поддержка'), 30, 'Специалист технической поддержки', ''),

                                                                  -- Участники HR-отдела
                                                                  ('Мария Крылова', (SELECT id FROM teams WHERE name = 'Подбор персонала'), 27, 'HR-менеджер', ''),
                                                                  ('Николай Сорокин', (SELECT id FROM teams WHERE name = 'Подбор персонала'), 32, 'Старший HR-менеджер', ''),

                                                                  -- Участники Юридического отдела
                                                                  ('Олег Павлов', (SELECT id FROM teams WHERE name = 'Юридические консультации'), 45, 'Юрист', ''),
                                                                  ('Лидия Андреева', (SELECT id FROM teams WHERE name = 'Юридические консультации'), 39, 'Адвокат', ''),

                                                                  -- Участники Бухгалтерии
                                                                  ('Татьяна Егорова', (SELECT id FROM teams WHERE name = 'Бухгалтерский учет'), 50, 'Главный бухгалтер', ''),
                                                                  ('Сергей Матвеев', (SELECT id FROM teams WHERE name = 'Бухгалтерский учет'), 36, 'Бухгалтер', '');

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DELETE FROM departments;
DELETE FROM teams;
DELETE FROM members;
-- +goose StatementEnd
