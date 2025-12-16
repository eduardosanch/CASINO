package com.casino.domain.juego;


public enum EstadoJuego {
    READY,          // Listo para iniciar partida
    IN_PROGRESS,    // Partida en curso
    FINISHED,       // Partida terminada
    PAUSED,         // Pausado temporalmente
    ERROR           // Estado de error inesperado
}
