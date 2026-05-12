-- =============================================
-- SEED DATA - Convive (Datos de prueba realistas)
-- Contraseña para todos los usuarios: password123 (BCrypt)
-- Hash: $2a$10$Z1DqIU/K9fWQ4dyZ.lDQMe1ECWuMCN6I4Jy/A7hV08dIQmVP8.5bW
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
VALUES (1, 'Comunidad de Propietarios Edificio Giralda', 'Calle Sierpes 42, Sevilla', '2022-09-01 10:00:00', '2026-03-15 09:22:00');

-- =============================================
-- PISOS (12 pisos: 3 plantas x 4 puertas)
-- =============================================
INSERT INTO apartment (id, community_id, floor, door, active, created_at, updated_at) VALUES
-- Planta 1
(1,  1, 1, 'A', true,  '2022-09-01 10:00:00', '2022-09-01 10:00:00'),
(2,  1, 1, 'B', true,  '2022-09-01 10:00:00', '2022-09-01 10:00:00'),
(3,  1, 1, 'C', true,  '2022-09-01 10:00:00', '2022-09-01 10:00:00'),
(4,  1, 1, 'D', true,  '2022-09-01 10:00:00', '2022-09-01 10:00:00'),
-- Planta 2
(5,  1, 2, 'A', true,  '2022-09-01 10:00:00', '2022-09-01 10:00:00'),
(6,  1, 2, 'B', true,  '2022-09-01 10:00:00', '2022-09-01 10:00:00'),
(7,  1, 2, 'C', true,  '2022-09-01 10:00:00', '2022-09-01 10:00:00'),
(8,  1, 2, 'D', true,  '2022-09-01 10:00:00', '2022-09-01 10:00:00'),
-- Planta 3
(9,  1, 3, 'A', true,  '2022-09-01 10:00:00', '2022-09-01 10:00:00'),
(10, 1, 3, 'B', true,  '2022-09-01 10:00:00', '2022-09-01 10:00:00'),
(11, 1, 3, 'C', true,  '2022-09-01 10:00:00', '2022-09-01 10:00:00'),
(12, 1, 3, 'D', true,  '2022-09-01 10:00:00', '2022-09-01 10:00:00');

-- =============================================
-- USUARIOS (10 usuarios)
-- Contraseña: password123
-- =============================================

-- Presidente (id=1) → 1ºA
INSERT INTO users (id, first_name, last_name_1, last_name_2, phone, email, password_hash, enabled, role, created_at, updated_at)
VALUES (1, 'Tomás', 'Herrera', 'Villanueva', '634872193', 'tomas.herrera@gmail.com',
        '$2a$10$Z1DqIU/K9fWQ4dyZ.lDQMe1ECWuMCN6I4Jy/A7hV08dIQmVP8.5bW',
        true, 'PRESIDENT', '2022-09-01 10:00:00', '2022-09-01 10:00:00');

-- Residente (id=2) → 1ºB
INSERT INTO users (id, first_name, last_name_1, last_name_2, phone, email, password_hash, enabled, role, created_at, updated_at)
VALUES (2, 'Lucía', 'Moreno', 'Castillo', '691043827', 'lucia.moreno@hotmail.com',
        '$2a$10$Z1DqIU/K9fWQ4dyZ.lDQMe1ECWuMCN6I4Jy/A7hV08dIQmVP8.5bW',
        true, 'RESIDENT', '2022-09-15 11:30:00', '2022-09-15 11:30:00');

-- Residente (id=3) → 1ºC
INSERT INTO users (id, first_name, last_name_1, last_name_2, phone, email, password_hash, enabled, role, created_at, updated_at)
VALUES (3, 'Javier', 'Romero', 'Blanco', '657304918', 'javiromero84@yahoo.es',
        '$2a$10$Z1DqIU/K9fWQ4dyZ.lDQMe1ECWuMCN6I4Jy/A7hV08dIQmVP8.5bW',
        true, 'RESIDENT', '2022-09-20 09:15:00', '2022-09-20 09:15:00');

-- Residente (id=4) → 1ºD
INSERT INTO users (id, first_name, last_name_1, last_name_2, phone, email, password_hash, enabled, role, created_at, updated_at)
VALUES (4, 'Carmen', 'Jiménez', 'Ortega', '723549861', 'carmen.jimenez@outlook.com',
        '$2a$10$Z1DqIU/K9fWQ4dyZ.lDQMe1ECWuMCN6I4Jy/A7hV08dIQmVP8.5bW',
        true, 'RESIDENT', '2022-10-03 16:40:00', '2022-10-03 16:40:00');

-- Residente (id=5) → 2ºA
INSERT INTO users (id, first_name, last_name_1, last_name_2, phone, email, password_hash, enabled, role, created_at, updated_at)
VALUES (5, 'Raúl', 'Navarro', 'Fuentes', '648219374', 'raulnavarro@gmail.com',
        '$2a$10$Z1DqIU/K9fWQ4dyZ.lDQMe1ECWuMCN6I4Jy/A7hV08dIQmVP8.5bW',
        true, 'RESIDENT', '2022-10-10 10:00:00', '2022-10-10 10:00:00');

-- Residente (id=6) → 2ºB
INSERT INTO users (id, first_name, last_name_1, last_name_2, phone, email, password_hash, enabled, role, created_at, updated_at)
VALUES (6, 'Isabel', 'Vega', 'Molina', '612783045', 'isabelvm@gmail.com',
        '$2a$10$Z1DqIU/K9fWQ4dyZ.lDQMe1ECWuMCN6I4Jy/A7hV08dIQmVP8.5bW',
        true, 'RESIDENT', '2023-01-18 12:00:00', '2023-01-18 12:00:00');

-- Residente (id=7) → 2ºC
INSERT INTO users (id, first_name, last_name_1, last_name_2, phone, email, password_hash, enabled, role, created_at, updated_at)
VALUES (7, 'Andrés', 'Serrano', 'Ramos', '679428510', 'andres.serrano@icloud.com',
        '$2a$10$Z1DqIU/K9fWQ4dyZ.lDQMe1ECWuMCN6I4Jy/A7hV08dIQmVP8.5bW',
        true, 'RESIDENT', '2023-02-27 08:50:00', '2023-02-27 08:50:00');

-- Residente (id=8) → 3ºA
INSERT INTO users (id, first_name, last_name_1, last_name_2, phone, email, password_hash, enabled, role, created_at, updated_at)
VALUES (8, 'Sofía', 'Guerrero', 'Peña', '604931782', 'sofiagp@hotmail.es',
        '$2a$10$Z1DqIU/K9fWQ4dyZ.lDQMe1ECWuMCN6I4Jy/A7hV08dIQmVP8.5bW',
        true, 'RESIDENT', '2023-06-05 14:25:00', '2023-06-05 14:25:00');

-- Residente (id=9) → 3ºB
INSERT INTO users (id, first_name, last_name_1, last_name_2, phone, email, password_hash, enabled, role, created_at, updated_at)
VALUES (9, 'Miguel', 'Ibáñez', 'Cano', '655018436', 'miguel.ibanez@gmail.com',
        '$2a$10$Z1DqIU/K9fWQ4dyZ.lDQMe1ECWuMCN6I4Jy/A7hV08dIQmVP8.5bW',
        true, 'RESIDENT', '2023-09-11 17:10:00', '2023-09-11 17:10:00');

-- Residente (id=10) → SIN PISO ASIGNADO (tiene cuenta pero aún no se ha unido con código)
INSERT INTO users (id, first_name, last_name_1, last_name_2, phone, email, password_hash, enabled, role, created_at, updated_at)
VALUES (10, 'Elena', 'Pascual', 'Rubio', '638402971', 'elenapascual@yahoo.com',
        '$2a$10$Z1DqIU/K9fWQ4dyZ.lDQMe1ECWuMCN6I4Jy/A7hV08dIQmVP8.5bW',
        true, 'RESIDENT', '2026-03-20 09:00:00', '2026-03-20 09:00:00');

-- =============================================
-- ASIGNACIONES PISO-USUARIO
-- 2ºD, 3ºC y 3ºD quedan sin asignar (sin usuario)
-- =============================================
INSERT INTO user_apartment (id, user_id, apartment_id, assigned_at) VALUES
(1,  1,  1,  '2022-09-01 10:05:00'),  -- Tomás   → 1ºA
(2,  2,  2,  '2022-09-15 11:35:00'),  -- Lucía   → 1ºB
(3,  3,  3,  '2022-09-20 09:20:00'),  -- Javier  → 1ºC
(4,  4,  4,  '2022-10-03 16:45:00'),  -- Carmen  → 1ºD
(5,  5,  5,  '2022-10-10 10:05:00'),  -- Raúl    → 2ºA
(6,  6,  6,  '2023-01-18 12:05:00'),  -- Isabel  → 2ºB
(7,  7,  7,  '2023-02-27 08:55:00'),  -- Andrés  → 2ºC
(8,  8,  9,  '2023-06-05 14:30:00'),  -- Sofía   → 3ºA
(9,  9,  10, '2023-09-11 17:15:00');  -- Miguel  → 3ºB
-- Elena (id=10) sin piso asignado
-- Pisos 8 (2ºD), 11 (3ºC) y 12 (3ºD) sin usuario asignado

-- =============================================
-- INVITACIONES
-- Mezcla de: usadas, vigentes, caducadas
-- =============================================
INSERT INTO invitations (id, apartment_id, code, used, used_by, created_at, expires_at) VALUES
-- Usadas (históricas, cuando los vecinos se registraron)
(1,  2,  'KP3N8QWX', true,  2, '2022-09-14 10:00:00', '2022-09-21 23:59:59'),
(2,  3,  'ZM7TF2LD', true,  3, '2022-09-19 09:00:00', '2022-09-26 23:59:59'),
(3,  4,  'RQ9BVA6S', true,  4, '2022-10-02 12:00:00', '2022-10-09 23:59:59'),
(4,  5,  'HJ4CY8NE', true,  5, '2022-10-09 08:00:00', '2022-10-16 23:59:59'),
(5,  6,  'WD2XP5GR', true,  6, '2023-01-17 16:00:00', '2023-01-24 23:59:59'),
(6,  7,  'UV6KT3MA', true,  7, '2023-02-26 11:00:00', '2023-03-05 23:59:59'),
(7,  9,  'FB1SH9QZ', true,  8, '2023-06-04 10:00:00', '2023-06-11 23:59:59'),
(8,  10, 'EG8NL4PW', true,  9, '2023-09-10 09:00:00', '2023-09-17 23:59:59'),
-- Caducadas sin usar (el presidente las generó pero el vecino no llegó a tiempo)
(9,  8,  'TC5JR7YQ', false, NULL, '2025-11-01 10:00:00', '2025-11-08 23:59:59'),
(10, 11, 'MX3BW2KN', false, NULL, '2025-11-15 10:00:00', '2025-11-22 23:59:59'),
(11, 12, 'PL9DF6AU', false, NULL, '2026-01-10 10:00:00', '2026-01-17 23:59:59'),
-- Caducada para Elena (intentó unirse al 3ºC pero no llegó a tiempo, luego se registró sin piso)
(12, 11, 'SN4HG8VT', false, NULL, '2026-03-18 10:00:00', '2026-03-25 23:59:59'),
-- Vigente actualmente: el presidente acaba de generar para el 2ºD y 3ºD
(13, 8,  'QA7RM1EX', false, NULL, '2026-05-10 09:00:00', '2026-05-17 23:59:59'),
(14, 12, 'BK2NP5WJ', false, NULL, '2026-05-11 11:00:00', '2026-05-18 23:59:59');

-- =============================================
-- PRESUPUESTOS (2023, 2024, 2025 cerrados + 2026 abierto)
-- =============================================
INSERT INTO budget (id, community_id, name, start_date, end_date, annual_amount, emergency_fund, status, created_at, updated_at) VALUES
(1, 1, 'Presupuesto 2023', '2023-01-01', '2023-12-31', 10800.00, 1200.00, 'CLOSED', '2023-01-05 10:00:00', '2024-01-10 09:00:00'),
(2, 1, 'Presupuesto 2024', '2024-01-01', '2024-12-31', 11400.00, 1300.00, 'CLOSED', '2024-01-08 10:00:00', '2025-01-09 09:30:00'),
(3, 1, 'Presupuesto 2025', '2025-01-01', '2025-12-31', 12000.00, 1400.00, 'CLOSED', '2025-01-07 10:00:00', '2026-01-08 09:00:00'),
(4, 1, 'Presupuesto 2026', '2026-01-01', '2026-12-31', 13200.00, 1600.00, 'OPEN',   '2026-01-07 10:00:00', '2026-01-07 10:00:00');

-- =============================================
-- GASTOS
-- =============================================

-- ---------- PRESUPUESTO 2023 (id=1) ----------
-- Gastos fijos mensuales: limpieza (150€) + portería parcial (200€)
-- Gastos variables: electricidad, agua, reparaciones esporádicas
INSERT INTO expenses (id, budget_id, name, description, type, cost, month, created_at, updated_at) VALUES
-- Enero 2023
(1,  1, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — enero',          'FIXED',    150.00,  1, '2023-01-31 12:00:00', '2023-01-31 12:00:00'),
(2,  1, 'Electricidad zonas comunes',  'Factura Endesa enero',                      'VARIABLE',  74.20,  1, '2023-01-31 12:00:00', '2023-01-31 12:00:00'),
(3,  1, 'Agua escalera',               'Consumo agua enero',                        'VARIABLE',  22.50,  1, '2023-01-31 12:00:00', '2023-01-31 12:00:00'),
-- Febrero 2023
(4,  1, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — febrero',        'FIXED',    150.00,  2, '2023-02-28 12:00:00', '2023-02-28 12:00:00'),
(5,  1, 'Electricidad zonas comunes',  'Factura Endesa febrero',                    'VARIABLE',  68.90,  2, '2023-02-28 12:00:00', '2023-02-28 12:00:00'),
(6,  1, 'Reparación puerta garaje',    'Rotura muelle — presupuesto Metálicas Cano','VARIABLE', 320.00,  2, '2023-02-28 12:00:00', '2023-02-28 12:00:00'),
-- Marzo 2023
(7,  1, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — marzo',          'FIXED',    150.00,  3, '2023-03-31 12:00:00', '2023-03-31 12:00:00'),
(8,  1, 'Electricidad zonas comunes',  'Factura Endesa marzo',                      'VARIABLE',  71.40,  3, '2023-03-31 12:00:00', '2023-03-31 12:00:00'),
(9,  1, 'Agua escalera',               'Consumo agua marzo',                        'VARIABLE',  19.80,  3, '2023-03-31 12:00:00', '2023-03-31 12:00:00'),
-- Abril 2023
(10, 1, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — abril',          'FIXED',    150.00,  4, '2023-04-30 12:00:00', '2023-04-30 12:00:00'),
(11, 1, 'Electricidad zonas comunes',  'Factura Endesa abril',                      'VARIABLE',  65.30,  4, '2023-04-30 12:00:00', '2023-04-30 12:00:00'),
(12, 1, 'Seguro comunitario anual',    'Allianz — renovación anual',                'FIXED',    480.00,  4, '2023-04-30 12:00:00', '2023-04-30 12:00:00'),
-- Mayo 2023
(13, 1, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — mayo',           'FIXED',    150.00,  5, '2023-05-31 12:00:00', '2023-05-31 12:00:00'),
(14, 1, 'Electricidad zonas comunes',  'Factura Endesa mayo',                       'VARIABLE',  61.70,  5, '2023-05-31 12:00:00', '2023-05-31 12:00:00'),
(15, 1, 'Mantenimiento ascensor',      'Thyssen — revisión semestral junio',        'FIXED',    210.00,  5, '2023-05-31 12:00:00', '2023-05-31 12:00:00'),
-- Junio 2023
(16, 1, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — junio',          'FIXED',    150.00,  6, '2023-06-30 12:00:00', '2023-06-30 12:00:00'),
(17, 1, 'Electricidad zonas comunes',  'Factura Endesa junio',                      'VARIABLE',  79.50,  6, '2023-06-30 12:00:00', '2023-06-30 12:00:00'),
(18, 1, 'Agua escalera',               'Consumo agua junio',                        'VARIABLE',  21.30,  6, '2023-06-30 12:00:00', '2023-06-30 12:00:00'),
-- Julio 2023
(19, 1, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — julio',          'FIXED',    150.00,  7, '2023-07-31 12:00:00', '2023-07-31 12:00:00'),
(20, 1, 'Electricidad zonas comunes',  'Factura Endesa julio — pico verano',        'VARIABLE', 112.40,  7, '2023-07-31 12:00:00', '2023-07-31 12:00:00'),
(21, 1, 'Limpieza fachada',            'Contratación puntual lavado fachada',       'VARIABLE', 560.00,  7, '2023-07-31 12:00:00', '2023-07-31 12:00:00'),
-- Agosto 2023
(22, 1, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — agosto',         'FIXED',    150.00,  8, '2023-08-31 12:00:00', '2023-08-31 12:00:00'),
(23, 1, 'Electricidad zonas comunes',  'Factura Endesa agosto',                     'VARIABLE', 108.70,  8, '2023-08-31 12:00:00', '2023-08-31 12:00:00'),
(24, 1, 'Agua escalera',               'Consumo agua agosto',                       'VARIABLE',  23.60,  8, '2023-08-31 12:00:00', '2023-08-31 12:00:00'),
-- Septiembre 2023
(25, 1, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — septiembre',     'FIXED',    150.00,  9, '2023-09-30 12:00:00', '2023-09-30 12:00:00'),
(26, 1, 'Electricidad zonas comunes',  'Factura Endesa septiembre',                 'VARIABLE',  88.20,  9, '2023-09-30 12:00:00', '2023-09-30 12:00:00'),
(27, 1, 'Mantenimiento ascensor',      'Thyssen — revisión semestral diciembre',    'FIXED',    210.00,  9, '2023-09-30 12:00:00', '2023-09-30 12:00:00'),
-- Octubre 2023
(28, 1, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — octubre',        'FIXED',    150.00, 10, '2023-10-31 12:00:00', '2023-10-31 12:00:00'),
(29, 1, 'Electricidad zonas comunes',  'Factura Endesa octubre',                    'VARIABLE',  76.90, 10, '2023-10-31 12:00:00', '2023-10-31 12:00:00'),
(30, 1, 'Reparación bajante agua',     'Fontanería Hermanos Ruiz — filtración 3ºA', 'VARIABLE', 870.00, 10, '2023-10-31 12:00:00', '2023-10-31 12:00:00'),
-- Noviembre 2023
(31, 1, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — noviembre',      'FIXED',    150.00, 11, '2023-11-30 12:00:00', '2023-11-30 12:00:00'),
(32, 1, 'Electricidad zonas comunes',  'Factura Endesa noviembre',                  'VARIABLE',  80.30, 11, '2023-11-30 12:00:00', '2023-11-30 12:00:00'),
(33, 1, 'Agua escalera',               'Consumo agua noviembre',                    'VARIABLE',  20.10, 11, '2023-11-30 12:00:00', '2023-11-30 12:00:00'),
-- Diciembre 2023
(34, 1, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — diciembre',      'FIXED',    150.00, 12, '2023-12-31 12:00:00', '2023-12-31 12:00:00'),
(35, 1, 'Electricidad zonas comunes',  'Factura Endesa diciembre',                  'VARIABLE',  83.60, 12, '2023-12-31 12:00:00', '2023-12-31 12:00:00'),
(36, 1, 'Decoración navideña',         'Luces y adornos portal y escalera',         'VARIABLE', 145.00, 12, '2023-12-31 12:00:00', '2023-12-31 12:00:00');

-- ---------- PRESUPUESTO 2024 (id=2) ----------
INSERT INTO expenses (id, budget_id, name, description, type, cost, month, created_at, updated_at) VALUES
-- Enero 2024
(37, 2, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — enero',          'FIXED',    160.00,  1, '2024-01-31 12:00:00', '2024-01-31 12:00:00'),
(38, 2, 'Electricidad zonas comunes',  'Factura Endesa enero',                      'VARIABLE',  81.50,  1, '2024-01-31 12:00:00', '2024-01-31 12:00:00'),
(39, 2, 'Agua escalera',               'Consumo agua enero',                        'VARIABLE',  24.30,  1, '2024-01-31 12:00:00', '2024-01-31 12:00:00'),
-- Febrero 2024
(40, 2, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — febrero',        'FIXED',    160.00,  2, '2024-02-29 12:00:00', '2024-02-29 12:00:00'),
(41, 2, 'Electricidad zonas comunes',  'Factura Endesa febrero',                    'VARIABLE',  75.80,  2, '2024-02-29 12:00:00', '2024-02-29 12:00:00'),
(42, 2, 'Sustitución bombillas LED',   'Portal y escaleras — 24 unidades',          'VARIABLE', 187.50,  2, '2024-02-29 12:00:00', '2024-02-29 12:00:00'),
-- Marzo 2024
(43, 2, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — marzo',          'FIXED',    160.00,  3, '2024-03-31 12:00:00', '2024-03-31 12:00:00'),
(44, 2, 'Electricidad zonas comunes',  'Factura Endesa marzo',                      'VARIABLE',  70.20,  3, '2024-03-31 12:00:00', '2024-03-31 12:00:00'),
(45, 2, 'Mantenimiento ascensor',      'Thyssen — revisión semestral',              'FIXED',    225.00,  3, '2024-03-31 12:00:00', '2024-03-31 12:00:00'),
-- Abril 2024
(46, 2, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — abril',          'FIXED',    160.00,  4, '2024-04-30 12:00:00', '2024-04-30 12:00:00'),
(47, 2, 'Electricidad zonas comunes',  'Factura Endesa abril',                      'VARIABLE',  66.40,  4, '2024-04-30 12:00:00', '2024-04-30 12:00:00'),
(48, 2, 'Seguro comunitario anual',    'Allianz — renovación anual',                'FIXED',    510.00,  4, '2024-04-30 12:00:00', '2024-04-30 12:00:00'),
(49, 2, 'Agua escalera',               'Consumo agua abril',                        'VARIABLE',  22.70,  4, '2024-04-30 12:00:00', '2024-04-30 12:00:00'),
-- Mayo 2024
(50, 2, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — mayo',           'FIXED',    160.00,  5, '2024-05-31 12:00:00', '2024-05-31 12:00:00'),
(51, 2, 'Electricidad zonas comunes',  'Factura Endesa mayo',                       'VARIABLE',  63.90,  5, '2024-05-31 12:00:00', '2024-05-31 12:00:00'),
(52, 2, 'Pintura portal',              'Empresa Pinturas Sur — renovación portal',  'VARIABLE', 1250.00, 5, '2024-05-31 12:00:00', '2024-05-31 12:00:00'),
-- Junio 2024
(53, 2, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — junio',          'FIXED',    160.00,  6, '2024-06-30 12:00:00', '2024-06-30 12:00:00'),
(54, 2, 'Electricidad zonas comunes',  'Factura Endesa junio',                      'VARIABLE',  84.60,  6, '2024-06-30 12:00:00', '2024-06-30 12:00:00'),
(55, 2, 'Mantenimiento ascensor',      'Thyssen — revisión semestral',              'FIXED',    225.00,  6, '2024-06-30 12:00:00', '2024-06-30 12:00:00'),
(56, 2, 'Agua escalera',               'Consumo agua junio',                        'VARIABLE',  25.10,  6, '2024-06-30 12:00:00', '2024-06-30 12:00:00'),
-- Julio 2024
(57, 2, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — julio',          'FIXED',    160.00,  7, '2024-07-31 12:00:00', '2024-07-31 12:00:00'),
(58, 2, 'Electricidad zonas comunes',  'Factura Endesa julio',                      'VARIABLE', 119.30,  7, '2024-07-31 12:00:00', '2024-07-31 12:00:00'),
(59, 2, 'Agua escalera',               'Consumo agua julio',                        'VARIABLE',  27.40,  7, '2024-07-31 12:00:00', '2024-07-31 12:00:00'),
-- Agosto 2024
(60, 2, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — agosto',         'FIXED',    160.00,  8, '2024-08-31 12:00:00', '2024-08-31 12:00:00'),
(61, 2, 'Electricidad zonas comunes',  'Factura Endesa agosto',                     'VARIABLE', 124.50,  8, '2024-08-31 12:00:00', '2024-08-31 12:00:00'),
(62, 2, 'Reparación grifo azotea',     'Fontanería Hermanos Ruiz — fuga azotea',   'VARIABLE', 195.00,  8, '2024-08-31 12:00:00', '2024-08-31 12:00:00'),
-- Septiembre 2024
(63, 2, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — septiembre',     'FIXED',    160.00,  9, '2024-09-30 12:00:00', '2024-09-30 12:00:00'),
(64, 2, 'Electricidad zonas comunes',  'Factura Endesa septiembre',                 'VARIABLE',  92.10,  9, '2024-09-30 12:00:00', '2024-09-30 12:00:00'),
(65, 2, 'Agua escalera',               'Consumo agua septiembre',                   'VARIABLE',  23.80,  9, '2024-09-30 12:00:00', '2024-09-30 12:00:00'),
-- Octubre 2024
(66, 2, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — octubre',        'FIXED',    160.00, 10, '2024-10-31 12:00:00', '2024-10-31 12:00:00'),
(67, 2, 'Electricidad zonas comunes',  'Factura Endesa octubre',                    'VARIABLE',  82.40, 10, '2024-10-31 12:00:00', '2024-10-31 12:00:00'),
(68, 2, 'Desratización',               'Empresa Plagasur — tratamiento preventivo', 'VARIABLE', 240.00, 10, '2024-10-31 12:00:00', '2024-10-31 12:00:00'),
-- Noviembre 2024
(69, 2, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — noviembre',      'FIXED',    160.00, 11, '2024-11-30 12:00:00', '2024-11-30 12:00:00'),
(70, 2, 'Electricidad zonas comunes',  'Factura Endesa noviembre',                  'VARIABLE',  86.70, 11, '2024-11-30 12:00:00', '2024-11-30 12:00:00'),
(71, 2, 'Mantenimiento ascensor',      'Thyssen — avería botonera planta 2',        'VARIABLE', 380.00, 11, '2024-11-30 12:00:00', '2024-11-30 12:00:00'),
(72, 2, 'Agua escalera',               'Consumo agua noviembre',                    'VARIABLE',  21.50, 11, '2024-11-30 12:00:00', '2024-11-30 12:00:00'),
-- Diciembre 2024
(73, 2, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — diciembre',      'FIXED',    160.00, 12, '2024-12-31 12:00:00', '2024-12-31 12:00:00'),
(74, 2, 'Electricidad zonas comunes',  'Factura Endesa diciembre',                  'VARIABLE',  88.90, 12, '2024-12-31 12:00:00', '2024-12-31 12:00:00'),
(75, 2, 'Decoración navideña',         'Luces portal, árbol y adornos',             'VARIABLE', 165.00, 12, '2024-12-31 12:00:00', '2024-12-31 12:00:00');

-- ---------- PRESUPUESTO 2025 (id=3) ----------
INSERT INTO expenses (id, budget_id, name, description, type, cost, month, created_at, updated_at) VALUES
-- Enero 2025
(76, 3, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — enero',          'FIXED',    175.00,  1, '2025-01-31 12:00:00', '2025-01-31 12:00:00'),
(77, 3, 'Electricidad zonas comunes',  'Factura Endesa enero',                      'VARIABLE',  87.30,  1, '2025-01-31 12:00:00', '2025-01-31 12:00:00'),
(78, 3, 'Agua escalera',               'Consumo agua enero',                        'VARIABLE',  25.60,  1, '2025-01-31 12:00:00', '2025-01-31 12:00:00'),
-- Febrero 2025
(79, 3, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — febrero',        'FIXED',    175.00,  2, '2025-02-28 12:00:00', '2025-02-28 12:00:00'),
(80, 3, 'Electricidad zonas comunes',  'Factura Endesa febrero',                    'VARIABLE',  79.60,  2, '2025-02-28 12:00:00', '2025-02-28 12:00:00'),
(81, 3, 'Mantenimiento ascensor',      'Thyssen — revisión semestral',              'FIXED',    240.00,  2, '2025-02-28 12:00:00', '2025-02-28 12:00:00'),
-- Marzo 2025
(82, 3, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — marzo',          'FIXED',    175.00,  3, '2025-03-31 12:00:00', '2025-03-31 12:00:00'),
(83, 3, 'Electricidad zonas comunes',  'Factura Endesa marzo',                      'VARIABLE',  73.80,  3, '2025-03-31 12:00:00', '2025-03-31 12:00:00'),
(84, 3, 'Inspección ITE',              'Inspección Técnica Edificios — informe',    'VARIABLE', 650.00,  3, '2025-03-31 12:00:00', '2025-03-31 12:00:00'),
(85, 3, 'Agua escalera',               'Consumo agua marzo',                        'VARIABLE',  22.40,  3, '2025-03-31 12:00:00', '2025-03-31 12:00:00'),
-- Abril 2025
(86, 3, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — abril',          'FIXED',    175.00,  4, '2025-04-30 12:00:00', '2025-04-30 12:00:00'),
(87, 3, 'Electricidad zonas comunes',  'Factura Endesa abril',                      'VARIABLE',  68.50,  4, '2025-04-30 12:00:00', '2025-04-30 12:00:00'),
(88, 3, 'Seguro comunitario anual',    'Allianz — renovación anual',                'FIXED',    540.00,  4, '2025-04-30 12:00:00', '2025-04-30 12:00:00'),
-- Mayo 2025
(89, 3, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — mayo',           'FIXED',    175.00,  5, '2025-05-31 12:00:00', '2025-05-31 12:00:00'),
(90, 3, 'Electricidad zonas comunes',  'Factura Endesa mayo',                       'VARIABLE',  65.20,  5, '2025-05-31 12:00:00', '2025-05-31 12:00:00'),
(91, 3, 'Agua escalera',               'Consumo agua mayo',                         'VARIABLE',  23.90,  5, '2025-05-31 12:00:00', '2025-05-31 12:00:00'),
-- Junio 2025
(92, 3, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — junio',          'FIXED',    175.00,  6, '2025-06-30 12:00:00', '2025-06-30 12:00:00'),
(93, 3, 'Electricidad zonas comunes',  'Factura Endesa junio',                      'VARIABLE',  88.40,  6, '2025-06-30 12:00:00', '2025-06-30 12:00:00'),
(94, 3, 'Mantenimiento ascensor',      'Thyssen — revisión semestral',              'FIXED',    240.00,  6, '2025-06-30 12:00:00', '2025-06-30 12:00:00'),
(95, 3, 'Reparación interfonos',       'Electrónica Gómez — sustitución 4 placas', 'VARIABLE', 430.00,  6, '2025-06-30 12:00:00', '2025-06-30 12:00:00'),
-- Julio 2025
(96, 3, 'Limpieza zonas comunes',      'Empresa Limpiatodo S.L. — julio',          'FIXED',    175.00,  7, '2025-07-31 12:00:00', '2025-07-31 12:00:00'),
(97, 3, 'Electricidad zonas comunes',  'Factura Endesa julio',                      'VARIABLE', 131.70,  7, '2025-07-31 12:00:00', '2025-07-31 12:00:00'),
(98, 3, 'Agua escalera',               'Consumo agua julio',                        'VARIABLE',  28.60,  7, '2025-07-31 12:00:00', '2025-07-31 12:00:00'),
-- Agosto 2025
(99,  3, 'Limpieza zonas comunes',     'Empresa Limpiatodo S.L. — agosto',         'FIXED',    175.00,  8, '2025-08-31 12:00:00', '2025-08-31 12:00:00'),
(100, 3, 'Electricidad zonas comunes', 'Factura Endesa agosto',                     'VARIABLE', 138.20,  8, '2025-08-31 12:00:00', '2025-08-31 12:00:00'),
(101, 3, 'Desatasco alcantarilla',     'Fontanería Hermanos Ruiz — urgencia',       'VARIABLE', 285.00,  8, '2025-08-31 12:00:00', '2025-08-31 12:00:00'),
-- Septiembre 2025
(102, 3, 'Limpieza zonas comunes',     'Empresa Limpiatodo S.L. — septiembre',     'FIXED',    175.00,  9, '2025-09-30 12:00:00', '2025-09-30 12:00:00'),
(103, 3, 'Electricidad zonas comunes', 'Factura Endesa septiembre',                 'VARIABLE',  95.80,  9, '2025-09-30 12:00:00', '2025-09-30 12:00:00'),
(104, 3, 'Agua escalera',              'Consumo agua septiembre',                   'VARIABLE',  24.50,  9, '2025-09-30 12:00:00', '2025-09-30 12:00:00'),
-- Octubre 2025
(105, 3, 'Limpieza zonas comunes',     'Empresa Limpiatodo S.L. — octubre',        'FIXED',    175.00, 10, '2025-10-31 12:00:00', '2025-10-31 12:00:00'),
(106, 3, 'Electricidad zonas comunes', 'Factura Endesa octubre',                    'VARIABLE',  84.30, 10, '2025-10-31 12:00:00', '2025-10-31 12:00:00'),
(107, 3, 'Jardinería zonas verdes',    'Poda setos entrada y macetones portal',     'VARIABLE', 320.00, 10, '2025-10-31 12:00:00', '2025-10-31 12:00:00'),
-- Noviembre 2025
(108, 3, 'Limpieza zonas comunes',     'Empresa Limpiatodo S.L. — noviembre',      'FIXED',    175.00, 11, '2025-11-30 12:00:00', '2025-11-30 12:00:00'),
(109, 3, 'Electricidad zonas comunes', 'Factura Endesa noviembre',                  'VARIABLE',  89.40, 11, '2025-11-30 12:00:00', '2025-11-30 12:00:00'),
(110, 3, 'Mantenimiento ascensor',     'Thyssen — fallo sensor puertas 2ºB',        'VARIABLE', 410.00, 11, '2025-11-30 12:00:00', '2025-11-30 12:00:00'),
(111, 3, 'Agua escalera',              'Consumo agua noviembre',                    'VARIABLE',  22.80, 11, '2025-11-30 12:00:00', '2025-11-30 12:00:00'),
-- Diciembre 2025
(112, 3, 'Limpieza zonas comunes',     'Empresa Limpiatodo S.L. — diciembre',      'FIXED',    175.00, 12, '2025-12-31 12:00:00', '2025-12-31 12:00:00'),
(113, 3, 'Electricidad zonas comunes', 'Factura Endesa diciembre',                  'VARIABLE',  93.10, 12, '2025-12-31 12:00:00', '2025-12-31 12:00:00'),
(114, 3, 'Decoración navideña',        'Luces LED portal y árbol escalera',         'VARIABLE', 175.00, 12, '2025-12-31 12:00:00', '2025-12-31 12:00:00');

-- ---------- PRESUPUESTO 2026 (id=4) — enero a mayo ----------
INSERT INTO expenses (id, budget_id, name, description, type, cost, month, created_at, updated_at) VALUES
-- Enero 2026
(115, 4, 'Limpieza zonas comunes',     'Empresa Limpiatodo S.L. — enero',          'FIXED',    190.00,  1, '2026-01-31 12:00:00', '2026-01-31 12:00:00'),
(116, 4, 'Electricidad zonas comunes', 'Factura Endesa enero',                      'VARIABLE',  93.40,  1, '2026-01-31 12:00:00', '2026-01-31 12:00:00'),
(117, 4, 'Agua escalera',              'Consumo agua enero',                        'VARIABLE',  26.20,  1, '2026-01-31 12:00:00', '2026-01-31 12:00:00'),
(118, 4, 'Mantenimiento ascensor',     'Thyssen — revisión semestral enero',        'FIXED',    255.00,  1, '2026-01-31 12:00:00', '2026-01-31 12:00:00'),
-- Febrero 2026
(119, 4, 'Limpieza zonas comunes',     'Empresa Limpiatodo S.L. — febrero',        'FIXED',    190.00,  2, '2026-02-28 12:00:00', '2026-02-28 12:00:00'),
(120, 4, 'Electricidad zonas comunes', 'Factura Endesa febrero',                    'VARIABLE',  85.70,  2, '2026-02-28 12:00:00', '2026-02-28 12:00:00'),
(121, 4, 'Agua escalera',              'Consumo agua febrero',                      'VARIABLE',  23.10,  2, '2026-02-28 12:00:00', '2026-02-28 12:00:00'),
(122, 4, 'Seguro comunitario anual',   'Allianz — renovación anual 2026',           'FIXED',    570.00,  2, '2026-02-28 12:00:00', '2026-02-28 12:00:00'),
-- Marzo 2026
(123, 4, 'Limpieza zonas comunes',     'Empresa Limpiatodo S.L. — marzo',          'FIXED',    190.00,  3, '2026-03-31 12:00:00', '2026-03-31 12:00:00'),
(124, 4, 'Electricidad zonas comunes', 'Factura Endesa marzo',                      'VARIABLE',  76.90,  3, '2026-03-31 12:00:00', '2026-03-31 12:00:00'),
(125, 4, 'Agua escalera',              'Consumo agua marzo',                        'VARIABLE',  21.80,  3, '2026-03-31 12:00:00', '2026-03-31 12:00:00'),
(126, 4, 'Reparación escalón',         'Escalón roto planta 2 — Obras Rápidas SL', 'VARIABLE', 145.00,  3, '2026-03-31 12:00:00', '2026-03-31 12:00:00'),
-- Abril 2026
(127, 4, 'Limpieza zonas comunes',     'Empresa Limpiatodo S.L. — abril',          'FIXED',    190.00,  4, '2026-04-30 12:00:00', '2026-04-30 12:00:00'),
(128, 4, 'Electricidad zonas comunes', 'Factura Endesa abril',                      'VARIABLE',  70.30,  4, '2026-04-30 12:00:00', '2026-04-30 12:00:00'),
(129, 4, 'Agua escalera',              'Consumo agua abril',                        'VARIABLE',  24.60,  4, '2026-04-30 12:00:00', '2026-04-30 12:00:00'),
(130, 4, 'Instalación cerradura',      'Cerradura magnética puerta garaje',         'VARIABLE', 380.00,  4, '2026-04-30 12:00:00', '2026-04-30 12:00:00'),
-- Mayo 2026
(131, 4, 'Limpieza zonas comunes',     'Empresa Limpiatodo S.L. — mayo',           'FIXED',    190.00,  5, '2026-05-09 12:00:00', '2026-05-09 12:00:00'),
(132, 4, 'Electricidad zonas comunes', 'Factura Endesa mayo (estimada)',             'VARIABLE',  67.50,  5, '2026-05-09 12:00:00', '2026-05-09 12:00:00'),
(133, 4, 'Mantenimiento ascensor',     'Thyssen — revisión semestral julio',        'FIXED',    255.00,  5, '2026-05-09 12:00:00', '2026-05-09 12:00:00');

-- =============================================
-- VOTACIONES
-- =============================================

-- Votación 1: CERRADA — Aprobada (presupuesto 2024, instalación cámaras)
INSERT INTO polls (id, community_id, title, description, creator_id, status, created_at, updated_at, deadline)
VALUES (1, 1,
        'Instalación de cámaras de seguridad en portal y garaje',
        'Se propone la instalación de 3 cámaras de seguridad: una en el portal de entrada, una en el acceso al garaje y una en la escalera principal. Presupuesto aprobado: 1.800€. La empresa elegida es Seguridad Giralda S.L.',
        1, 'CLOSED', '2024-02-10 10:00:00', '2024-03-02 23:59:59', '2024-03-01 23:59:59');

-- Votación 2: CERRADA — Rechazada (presupuesto 2024, cambio empresa limpieza)
INSERT INTO polls (id, community_id, title, description, creator_id, status, created_at, updated_at, deadline)
VALUES (2, 1,
        'Cambio de empresa de limpieza',
        'Se propone cambiar la empresa de limpieza actual (Limpiatodo S.L.) por una nueva oferta recibida (CleanPro Servicios) que reduce el coste mensual de 160€ a 130€ pero reduce la frecuencia de limpieza de 3 a 2 días por semana.',
        1, 'CLOSED', '2024-05-15 10:00:00', '2024-06-05 23:59:59', '2024-06-04 23:59:59');

-- Votación 3: CERRADA — Aprobada por amplia mayoría (presupuesto 2025, obras ITE)
INSERT INTO polls (id, community_id, title, description, creator_id, status, created_at, updated_at, deadline)
VALUES (3, 1,
        'Aprobación obras derivadas de la Inspección Técnica del Edificio (ITE)',
        'Tras el informe ITE de marzo de 2025, se requieren obras en la impermeabilización de la azotea y refuerzo de la barandilla de la escalera exterior. Presupuesto total: 4.200€. Se propone financiar con el fondo de reserva existente.',
        1, 'CLOSED', '2025-04-01 10:00:00', '2025-04-20 23:59:59', '2025-04-19 23:59:59');

-- Votación 4: CERRADA — Deadline pasado sin votos suficientes (solo 2 votos)
INSERT INTO polls (id, community_id, title, description, creator_id, status, created_at, updated_at, deadline)
VALUES (4, 1,
        'Instalación de punto de recarga para vehículos eléctricos en garaje',
        'Se propone instalar un punto de carga de vehículo eléctrico en el garaje comunitario. El coste de instalación sería de 1.500€ y cada vecino interesado abonaría la parte proporcional. Requiere acuerdo de mayoría simple.',
        5, 'CLOSED', '2025-10-05 10:00:00', '2025-11-01 23:59:59', '2025-10-31 23:59:59');

-- Votación 5: ABIERTA — Deadline futuro, mayoría de votos ya recibidos
INSERT INTO polls (id, community_id, title, description, creator_id, status, created_at, updated_at, deadline)
VALUES (5, 1,
        'Instalación de placas solares en azotea',
        'Se propone instalar un sistema de autoconsumo fotovoltaico de 10 kWp en la azotea del edificio. El coste estimado es de 8.500€ con un período de amortización de 6-8 años. Se estudia una subvención del Ayuntamiento de Sevilla de hasta el 40%.',
        1, 'OPEN', '2026-04-20 10:00:00', '2026-05-05 09:00:00', '2026-06-15 23:59:59');

-- Votación 6: ABIERTA — Recién creada, sin votos aún
INSERT INTO polls (id, community_id, title, description, creator_id, status, created_at, updated_at, deadline)
VALUES (6, 1,
        'Aprobación de normas de uso de la azotea comunitaria',
        'Se propone establecer un reglamento de uso de la azotea: horario de acceso (9:00-21:00), prohibición de tendederos permanentes visibles desde la calle, y obligatoriedad de dejar el espacio limpio. El presidente redactará el documento definitivo si se aprueba.',
        1, 'OPEN', '2026-05-08 10:00:00', '2026-05-08 10:00:00', '2026-05-31 23:59:59');

-- Votación 7: ABIERTA — Deadline ya pasado (para probar cierre automático)
INSERT INTO polls (id, community_id, title, description, creator_id, status, created_at, updated_at, deadline)
VALUES (7, 1,
        'Contratación de servicio de jardinería mensual',
        'Se propone contratar a Jardines Bético S.L. para el mantenimiento mensual de las zonas verdes de la entrada (macetones, setos y zona de bicis). Coste mensual: 85€.',
        1, 'OPEN', '2026-04-01 10:00:00', '2026-04-15 09:00:00', '2026-04-30 23:59:59');

-- =============================================
-- VOTOS
-- =============================================

-- Votos votación 1 (instalación cámaras — CERRADA, aprobada)
INSERT INTO votes (id, poll_id, user_id, value, voted_at) VALUES
(1,  1, 1, 'IN_FAVOR', '2024-02-11 10:15:00'),
(2,  1, 2, 'IN_FAVOR', '2024-02-12 18:42:00'),
(3,  1, 3, 'IN_FAVOR', '2024-02-13 09:03:00'),
(4,  1, 4, 'ABSTAIN',  '2024-02-14 21:17:00'),
(5,  1, 5, 'IN_FAVOR', '2024-02-16 12:30:00'),
(6,  1, 6, 'IN_FAVOR', '2024-02-20 08:55:00'),
(7,  1, 7, 'IN_FAVOR', '2024-02-22 17:08:00'),
(8,  1, 8, 'AGAINST',  '2024-02-25 20:44:00');
-- Miguel (9) no votó en esta

-- Votos votación 2 (cambio empresa limpieza — CERRADA, rechazada)
INSERT INTO votes (id, poll_id, user_id, value, voted_at) VALUES
(9,  2, 1, 'AGAINST',  '2024-05-16 10:00:00'),
(10, 2, 2, 'AGAINST',  '2024-05-17 19:35:00'),
(11, 2, 3, 'IN_FAVOR', '2024-05-18 11:22:00'),
(12, 2, 4, 'AGAINST',  '2024-05-19 09:47:00'),
(13, 2, 5, 'IN_FAVOR', '2024-05-21 16:58:00'),
(14, 2, 6, 'AGAINST',  '2024-05-28 20:13:00'),
(15, 2, 7, 'ABSTAIN',  '2024-06-01 08:30:00'),
(16, 2, 8, 'AGAINST',  '2024-06-02 14:05:00'),
(17, 2, 9, 'AGAINST',  '2024-06-03 22:17:00');

-- Votos votación 3 (obras ITE — CERRADA, aprobada)
INSERT INTO votes (id, poll_id, user_id, value, voted_at) VALUES
(18, 3, 1, 'IN_FAVOR', '2025-04-02 09:00:00'),
(19, 3, 2, 'IN_FAVOR', '2025-04-02 21:30:00'),
(20, 3, 3, 'IN_FAVOR', '2025-04-03 10:15:00'),
(21, 3, 4, 'IN_FAVOR', '2025-04-04 17:40:00'),
(22, 3, 5, 'ABSTAIN',  '2025-04-07 11:22:00'),
(23, 3, 6, 'IN_FAVOR', '2025-04-10 08:50:00'),
(24, 3, 7, 'IN_FAVOR', '2025-04-12 19:03:00'),
(25, 3, 8, 'IN_FAVOR', '2025-04-14 16:27:00'),
(26, 3, 9, 'IN_FAVOR', '2025-04-17 09:41:00');

-- Votos votación 4 (coche eléctrico — CERRADA, baja participación)
INSERT INTO votes (id, poll_id, user_id, value, voted_at) VALUES
(27, 4, 5, 'IN_FAVOR', '2025-10-07 10:30:00'),
(28, 4, 7, 'IN_FAVOR', '2025-10-09 18:55:00');
-- Solo 2 de 9 vecinos votaron

-- Votos votación 5 (placas solares — ABIERTA, mayoría a favor)
INSERT INTO votes (id, poll_id, user_id, value, voted_at) VALUES
(29, 5, 1, 'IN_FAVOR', '2026-04-20 12:00:00'),
(30, 5, 2, 'IN_FAVOR', '2026-04-21 19:48:00'),
(31, 5, 3, 'AGAINST',  '2026-04-22 10:33:00'),
(32, 5, 4, 'IN_FAVOR', '2026-04-23 09:05:00'),
(33, 5, 6, 'ABSTAIN',  '2026-04-25 22:11:00'),
(34, 5, 8, 'IN_FAVOR', '2026-04-28 15:37:00');
-- Raúl(5), Andrés(7) y Miguel(9) aún no han votado

-- Votos votación 6 (normas azotea — ABIERTA, recién creada, sin votos)
-- Sin votos todavía

-- Votos votación 7 (jardinería — ABIERTA con deadline pasado)
INSERT INTO votes (id, poll_id, user_id, value, voted_at) VALUES
(35, 7, 1, 'IN_FAVOR', '2026-04-02 10:00:00'),
(36, 7, 2, 'IN_FAVOR', '2026-04-03 21:05:00'),
(37, 7, 3, 'IN_FAVOR', '2026-04-05 09:22:00'),
(38, 7, 5, 'AGAINST',  '2026-04-08 17:44:00'),
(39, 7, 9, 'IN_FAVOR', '2026-04-12 11:30:00');

-- =============================================
-- ACTUALIZAR SECUENCIAS
-- =============================================
SELECT setval('community_id_seq',    1);
SELECT setval('apartment_id_seq',   12);
SELECT setval('users_id_seq',       10);
SELECT setval('user_apartment_id_seq', 9);
SELECT setval('invitations_id_seq', 14);
SELECT setval('budget_id_seq',       4);
SELECT setval('expenses_id_seq',   133);
SELECT setval('polls_id_seq',        7);
SELECT setval('votes_id_seq',       39);