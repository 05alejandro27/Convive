INSERT INTO "community" ("name", "address") VALUES
('Montepinar', 'Calle Girasol 12, Sevilla');

INSERT INTO "apartment" ("community_id", "floor", "door") VALUES
(1, 1, 'A'),
(1, 1, 'B'),
(1, 2, 'A'),
(1, 2, 'B');

INSERT INTO "users" ("first_name", "last_name_1", "last_name_2", "phone", "email", "password_hash", "enabled", "role") VALUES
('María',     'González', 'López',    '600111222', 'maria@convive.com',     '$2a$10$J2IWUhkLInNPkzphzMOigOPk4wKa0VblSuZ0DJQ9yka/yPr1Z8DFe', TRUE, 'PRESIDENT'),
('Alejandro', 'Peña',     'Fernández','600333444', 'alejandro@convive.com', '$2a$10$J2IWUhkLInNPkzphzMOigOPk4wKa0VblSuZ0DJQ9yka/yPr1Z8DFe', TRUE, 'RESIDENT'),
('Carmen',    'Ruiz',     'Martínez', '600555666', 'carmen@convive.com',    '$2a$10$J2IWUhkLInNPkzphzMOigOPk4wKa0VblSuZ0DJQ9yka/yPr1Z8DFe', TRUE, 'RESIDENT');

INSERT INTO "user_apartment" ("user_id", "apartment_id") VALUES
(1, 1),
(2, 3),
(3, 4);

INSERT INTO "budget" ("community_id", "name", "start_date", "end_date", "annual_amount", "emergency_fund", "status") VALUES
(1, 'Presupuesto 2026', '2026-01-01', '2026-12-31', 24000.00, 3200.00, 'OPEN');

INSERT INTO "expenses" ("budget_id", "name", "description", "type", "cost", "month") VALUES
(1, 'Seguro del edificio',     'Seguro anual Mapfre',         'FIXED',    450.00, 1),
(1, 'Mantenimiento ascensor',  'Contrato Schindler mensual',  'FIXED',    150.00, 1),
(1, 'Reparación gotera portal','Empresa Obras Sevilla S.L.',  'VARIABLE', 850.00, 2),
(1, 'Pintura zonas comunes',   'Pintura escalera y portal',   'VARIABLE', 1400.00, 3);

INSERT INTO "polls" ("community_id", "title", "description", "creator_id", "status", "deadline") VALUES
(1,
 'Renovación del ascensor — Bloque A',
 'Se propone la renovación completa del ascensor del bloque A con un presupuesto de 12.400€ a cargo del fondo de emergencias. Empresa: Ascensores Sevilla S.L. Plazo de obra: 3 semanas.',
 1,
 'OPEN',
 '2026-03-28 23:59:59');

INSERT INTO "votes" ("poll_id", "user_id", "value") VALUES
(1, 1, 'IN_FAVOR');