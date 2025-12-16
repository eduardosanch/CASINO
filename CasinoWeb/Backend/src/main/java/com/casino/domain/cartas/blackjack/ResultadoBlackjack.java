package com.casino.domain.cartas.blackjack;

/**
 * Enumeración con todos los posibles resultados de una partida de Blackjack.
 */
public enum ResultadoBlackjack {
    JUGADOR_GANA,
    DEALER_GANA,
    EMPATE,
    BLACKJACK_JUGADOR,
    BLACKJACK_DEALER,
    JUGADOR_SE_PASA,
    DEALER_SE_PASA,
    RENDICION,
    EN_PROGRESO
}