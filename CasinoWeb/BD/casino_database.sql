-- Script para crear la base de datos Casino en PostgreSQL
-- Ejecutar con: psql -U postgres -f casino_database.sql

-- Crear base de datos
CREATE DATABASE casino_db;

-- Conectar a la nueva base de datos
\c casino_db;

-- =========================
-- TABLA USUARIO
-- =========================
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    contraseña VARCHAR(255),
    fondos DECIMAL(10,2),
    es_bot BOOLEAN DEFAULT FALSE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TABLA JUEGO
-- =========================
CREATE TABLE juego (
    id_juego SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT,
    tipo VARCHAR(50)
);

-- =========================
-- TABLA PARTIDA (MULTIJUGADOR)
-- =========================
CREATE TABLE partida (
    id_partida SERIAL PRIMARY KEY,
    id_juego INT NOT NULL,
    
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dinero_en_juego DECIMAL(10,2),
    resultado VARCHAR(20),
    FOREIGN KEY (id_juego) REFERENCES juego(id_juego) ON DELETE CASCADE
);

-- =========================
-- RELACIÓN PARTIDA - USUARIO
-- =========================
CREATE TABLE partida_jugador (
    id_partida_jugador SERIAL PRIMARY KEY,
    id_partida INT NOT NULL,
    id_usuario INT NOT NULL,
    rol VARCHAR(20),
    dinero_apostado DECIMAL(10,2),
    resultado VARCHAR(20),
    FOREIGN KEY (id_partida) REFERENCES partida(id_partida) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- =========================
-- BLACKJACK (DATOS GENERALES)
-- =========================
CREATE TABLE blackjack (
    id_blackjack SERIAL PRIMARY KEY,
    id_partida INT NOT NULL,
    cartas_no_disponibles TEXT,
    FOREIGN KEY (id_partida) REFERENCES partida(id_partida) ON DELETE CASCADE
);

-- =========================
-- BLACKJACK POR JUGADOR
-- =========================
CREATE TABLE blackjack_jugador (
    id_blackjack_jugador SERIAL PRIMARY KEY,
    id_blackjack INT NOT NULL,
    id_usuario INT NOT NULL,
    cartas_jugador TEXT,
    no_movimientos INT,
    fondos_finales DECIMAL(10,2),
    resultado VARCHAR(20),
    FOREIGN KEY (id_blackjack) REFERENCES blackjack(id_blackjack) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- =========================
-- POKER (DATOS GENERALES)
-- =========================
CREATE TABLE poker (
    id_poker SERIAL PRIMARY KEY,
    id_partida INT NOT NULL,
    cartas_comunitarias TEXT,
    historial_manos TEXT,
    FOREIGN KEY (id_partida) REFERENCES partida(id_partida) ON DELETE CASCADE
);

-- =========================
-- POKER POR JUGADOR
-- =========================
CREATE TABLE poker_jugador (
    id_poker_jugador SERIAL PRIMARY KEY,
    id_poker INT NOT NULL,
    id_usuario INT NOT NULL,
    cartas_jugador TEXT,
    apuestas_ronda TEXT,
    tipo_mano VARCHAR(50),
    resultado_mano VARCHAR(50),
    FOREIGN KEY (id_poker) REFERENCES poker(id_poker) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- =========================
-- BACCARAT
-- =========================
CREATE TABLE baccarat (
    id_baccarat SERIAL PRIMARY KEY,
    id_partida INT NOT NULL,
    resultado_ronda VARCHAR(20),
    cartas_repartidas TEXT,
    apuestas TEXT,
    historial_resultados TEXT,
    FOREIGN KEY (id_partida) REFERENCES partida(id_partida) ON DELETE CASCADE
);

-- =========================
-- SOLITARIO (INDIVIDUAL)
-- =========================
CREATE TABLE solitario (
    id_solitario SERIAL PRIMARY KEY,
    id_partida INT NOT NULL,
    estado_partida TEXT,
    movimientos_realizados TEXT,
    numero_movimientos INT,
    tiempo_segundos INT,
    resultado_final VARCHAR(20),
    FOREIGN KEY (id_partida) REFERENCES partida(id_partida) ON DELETE CASCADE
);

-- =========================
-- ESTADÍSTICAS DEL USUARIO
-- =========================
CREATE TABLE estadisticas (
    id_estadistica SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    partidas_jugadas INT,
    partidas_ganadas INT,
    partidas_perdidas INT,
    juego_favorito VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- =========================
-- HISTORIAL DE APUESTAS
-- =========================
CREATE TABLE historial_apuestas (
    id_apuesta SERIAL PRIMARY KEY,
    id_partida INT NOT NULL,
    id_usuario INT NOT NULL,
    monto DECIMAL(10,2),
    tipo_apuesta VARCHAR(50),
    resultado VARCHAR(20),
    FOREIGN KEY (id_partida) REFERENCES partida(id_partida) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- =========================
-- ÍNDICES PARA MEJOR RENDIMIENTO
-- =========================
CREATE INDEX idx_usuario_correo ON usuario(correo);
CREATE INDEX idx_partida_juego ON partida(id_juego);
CREATE INDEX idx_partida_jugador_partida ON partida_jugador(id_partida);
CREATE INDEX idx_partida_jugador_usuario ON partida_jugador(id_usuario);
CREATE INDEX idx_blackjack_partida ON blackjack(id_partida);
CREATE INDEX idx_blackjack_jugador_blackjack ON blackjack_jugador(id_blackjack);
CREATE INDEX idx_blackjack_jugador_usuario ON blackjack_jugador(id_usuario);
CREATE INDEX idx_poker_partida ON poker(id_partida);
CREATE INDEX idx_poker_jugador_poker ON poker_jugador(id_poker);
CREATE INDEX idx_poker_jugador_usuario ON poker_jugador(id_usuario);
CREATE INDEX idx_baccarat_partida ON baccarat(id_partida);
CREATE INDEX idx_solitario_partida ON solitario(id_partida);
CREATE INDEX idx_estadisticas_usuario ON estadisticas(id_usuario);
CREATE INDEX idx_historial_apuestas_partida ON historial_apuestas(id_partida);
CREATE INDEX idx_historial_apuestas_usuario ON historial_apuestas(id_usuario);

-- =========================
-- DATOS DE PRUEBA
-- =========================
INSERT INTO usuario (nombre, correo, contraseña, fondos, es_bot) VALUES
('Player 1', 'player1@casino.com', '123456', 5000.00, FALSE),
('Player 2', 'player2@casino.com', '123456', 3500.00, FALSE),
('Admin', 'admin@casino.com', '123456', 10000.00, FALSE),
('Bot Dealer', 'bot@casino.com', '123456', 50000.00, TRUE);

INSERT INTO juego (nombre, descripcion, tipo) VALUES
('Blackjack', 'Juego de cartas clásico', 'CARTAS'),
('Poker', 'Juego de estrategia y apuestas', 'CARTAS'),
('Baccarat', 'Juego de cartas de apuestas', 'CARTAS'),
('Ruleta', 'Juego de números y colores', 'APUESTAS'),
('Solitario', 'Juego individual de cartas', 'SOLITARIO');
