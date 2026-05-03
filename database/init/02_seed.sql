-- =============================================
-- SEED DATA - Convive (Sprint 7 - Polls)
-- Contraseña para todos los usuarios: 12345678
-- =============================================

-- Limpieza en orden inverso de dependencias
DELETE FROM votes;
DELETE FROM polls;
DELETE FROM expenses;
DELETE FROM budget;
DELETE FROM invitations;
DELETE FROM user_apartment;
DELETE FROM users;
DELETE FROM apartment;
DELETE FROM community;

-- Reinicio de secuencias
ALTER SEQUENCE community_id_seq RESTART WITH 1;
ALTER SEQUENCE apartment_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE user_apartment_id_seq RESTART WITH 1;
ALTER SEQUENCE invitations_id_seq RESTART WITH 1;
ALTER SEQUENCE budget_id_seq RESTART WITH 1;
ALTER SEQUENCE expenses_id_seq RESTART WITH 1;
ALTER SEQUENCE polls_id_seq RESTART WITH 1;
ALTER SEQUENCE votes_id_seq RESTART WITH 1;

-- =============================================
-- COMUNIDAD
-- =============================================
INSERT INTO community (id, name, address, created_at, updated_at)
VALUES (1, 'Comunidad Las Palmeras', 'Calle Las Palmeras 15, Sevilla', NOW(), NOW());

-- =============================================
-- PISOS (4 pisos activos)
-- =============================================
INSERT INTO apartment (id, community_id, floor, door, active, created_at, updated_at) VALUES
(1, 1, 1, 'A', true, NOW(), NOW()),
(2, 1, 1, 'B', true, NOW(), NOW()),
(3, 1, 2, 'A', true, NOW(), NOW()),
(4, 1, 2, 'B', true, NOW(), NOW());

-- =============================================
-- USUARIOS
-- Contraseña: 12345678 (BCrypt)
-- =============================================
-- Presidente (id=1)
INSERT INTO users (id, first_name, last_name_1, last_name_2, phone, email, password_hash, enabled, role, created_at, updated_at)
VALUES (1, 'Carlos', 'García', 'López', '600111111', 'carlos@email.com',
        '$2a$10$Z1DqIU/K9fWQ4dyZ.lDQMe1ECWuMCN6I4Jy/A7hV08dIQmVP8.5bW',
        true, 'PRESIDENT', NOW(), NOW());

-- Vecino 1 (id=2)
INSERT INTO users (id, first_name, last_name_1, last_name_2, phone, email, password_hash, enabled, role, created_at, updated_at)
VALUES (2, 'María', 'Fernández', 'Ruiz', '600222222', 'maria@email.com',
        '$2a$10$Z1DqIU/K9fWQ4dyZ.lDQMe1ECWuMCN6I4Jy/A7hV08dIQmVP8.5bW',
        true, 'RESIDENT', NOW(), NOW());

-- Vecino 2 (id=3)
INSERT INTO users (id, first_name, last_name_1, last_name_2, phone, email, password_hash, enabled, role, created_at, updated_at)
VALUES (3, 'Pedro', 'Martínez', 'Sánchez', '600333333', 'pedro@email.com',
        '$2a$10$Z1DqIU/K9fWQ4dyZ.lDQMe1ECWuMCN6I4Jy/A7hV08dIQmVP8.5bW',
        true, 'RESIDENT', NOW(), NOW());

-- Vecino 3 (id=4)
INSERT INTO users (id, first_name, last_name_1, last_name_2, phone, email, password_hash, enabled, role, created_at, updated_at)
VALUES (4, 'Ana', 'López', 'Torres', '600444444', 'ana@email.com',
        '$2a$10$Z1DqIU/K9fWQ4dyZ.lDQMe1ECWuMCN6I4Jy/A7hV08dIQmVP8.5bW',
        true, 'RESIDENT', NOW(), NOW());

-- =============================================
-- ASIGNACIONES PISO-USUARIO
-- =============================================
INSERT INTO user_apartment (id, user_id, apartment_id, assigned_at) VALUES
(1, 1, 1, NOW()),  -- Carlos (presidente) → 1ºA
(2, 2, 2, NOW()),  -- María → 1ºB
(3, 3, 3, NOW()),  -- Pedro → 2ºA
(4, 4, 4, NOW());  -- Ana → 2ºB

-- =============================================
-- PRESUPUESTO ABIERTO
-- =============================================
INSERT INTO budget (id, community_id, name, start_date, end_date, annual_amount, emergency_fund, status, created_at, updated_at)
VALUES (1, 1, 'Presupuesto 2026', '2026-01-01', '2026-12-31', 12000.00, 1500.00, 'OPEN', NOW(), NOW());

-- =============================================
-- GASTOS
-- =============================================
INSERT INTO expenses (id, budget_id, name, description, type, cost, month, created_at, updated_at) VALUES
(1, 1, 'Limpieza', 'Servicio mensual de limpieza', 'FIXED', 200.00, 1, NOW(), NOW()),
(2, 1, 'Electricidad zonas comunes', 'Factura de luz', 'VARIABLE', 85.50, 1, NOW(), NOW()),
(3, 1, 'Limpieza', 'Servicio mensual de limpieza', 'FIXED', 200.00, 2, NOW(), NOW()),
(4, 1, 'Reparación ascensor', 'Cambio de cable', 'VARIABLE', 450.00, 2, NOW(), NOW());

-- =============================================
-- VOTACIONES
-- =============================================

-- Votación 1: ABIERTA con deadline futuro (para probar votación normal)
INSERT INTO polls (id, community_id, title, description, creator_id, status, created_at, updated_at, deadline)
VALUES (1, 1, 'Instalación de placas solares', 'Se propone instalar placas solares en la azotea para reducir el gasto eléctrico comunitario.',
        1, 'OPEN', NOW(), NOW(), '2026-06-01 23:59:59');

-- Votación 2: ABIERTA con deadline ya pasado (para probar cierre automático)
INSERT INTO polls (id, community_id, title, description, creator_id, status, created_at, updated_at, deadline)
VALUES (2, 1, 'Pintar la fachada', 'Se propone pintar la fachada del edificio durante el verano.',
        1, 'OPEN', NOW(), NOW(), '2026-04-01 23:59:59');

-- =============================================
-- VOTOS (solo en la votación 2 para tener datos)
-- =============================================
INSERT INTO votes (id, poll_id, user_id, value, voted_at) VALUES
(1, 2, 1, 'IN_FAVOR', NOW()),   -- Carlos vota a favor
(2, 2, 2, 'IN_FAVOR', NOW()),   -- María vota a favor
(3, 2, 3, 'AGAINST', NOW());    -- Pedro vota en contra
-- Ana (id=4) no ha votado en la votación 2

-- Actualizar secuencias al valor máximo usado
SELECT setval('community_id_seq', 1);
SELECT setval('apartment_id_seq', 4);
SELECT setval('users_id_seq', 4);
SELECT setval('user_apartment_id_seq', 4);
SELECT setval('invitations_id_seq', 1);
SELECT setval('budget_id_seq', 1);
SELECT setval('expenses_id_seq', 4);
SELECT setval('polls_id_seq', 2);
SELECT setval('votes_id_seq', 3);