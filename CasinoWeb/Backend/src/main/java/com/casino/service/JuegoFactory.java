package com.casino.service;

import com.casino.domain.juego.Juego;
import com.casino.domain.cartas.blackjack.Blackjack;

public class JuegoFactory {

    private static final double SALDO_DEFAULT = 1000.0;

    public static Juego crearJuego(String tipoJuego, String jugadorId, Double saldoInicial) {
        double saldo = (saldoInicial == null) ? SALDO_DEFAULT : saldoInicial;

        switch (tipoJuego.toUpperCase()) {
            case "BLACKJACK":
                return new Blackjack(jugadorId, saldo);

            // TODO: Agregar más juegos cuando estén implementados
            // case "RULETA":
            //     return new Ruleta(jugadorId, saldo);

            default:
                throw new IllegalArgumentException("Tipo de juego desconocido: " + tipoJuego);
        }
    }
}
