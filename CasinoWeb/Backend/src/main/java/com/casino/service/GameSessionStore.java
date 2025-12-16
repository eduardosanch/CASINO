package com.casino.service;

import com.casino.domain.juego.Juego;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Guarda las instancias activas de juegos por jugador y tipo de juego.
 * Estructura: Map<jugadorId, Map<tipoJuego, Juego>>
 */
public class GameSessionStore {

    private final Map<String, Map<String, Juego>> store = new ConcurrentHashMap<>();

    public Juego getJuego(String jugadorId, String tipoJuego) {
        Map<String, Juego> map = store.get(jugadorId);
        return map == null ? null : map.get(tipoJuego);
    }

    public void putJuego(String jugadorId, String tipoJuego, Juego juego) {
        store.computeIfAbsent(jugadorId, k -> new ConcurrentHashMap<>())
             .put(tipoJuego, juego);
    }

    public void removeJuego(String jugadorId, String tipoJuego) {
        Map<String, Juego> map = store.get(jugadorId);
        if (map != null) {
            map.remove(tipoJuego);
        }
    }
}
