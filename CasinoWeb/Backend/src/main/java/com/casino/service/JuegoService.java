package com.casino.service;

import com.casino.domain.juego.Juego;
import com.casino.domain.juego.EstadoJuego;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class JuegoService {

    private final GameSessionStore store = new GameSessionStore();

    public Map<String, Object> iniciarJuego(String jugadorId, String tipoJuego, BigDecimal saldoInicial, BigDecimal apuesta) throws Exception {
        Juego juegoExistente = store.getJuego(jugadorId, tipoJuego);
        
        if (juegoExistente != null) {
            // Si el juego terminó, eliminarlo para crear uno nuevo
            if (juegoExistente.getEstado() == EstadoJuego.FINISHED) {
                store.removeJuego(jugadorId, tipoJuego);
            } else {
                // Si está en progreso, devolver el estado actual
                return juegoExistente.obtenerEstadoJuego();
            }
        }

        Juego juego = JuegoFactory.crearJuego(tipoJuego, jugadorId, saldoInicial.doubleValue());
        store.putJuego(jugadorId, tipoJuego, juego);

        // Establecer la apuesta antes de iniciar la partida
        juego.apostar(apuesta.doubleValue());
        
        // Inicia la partida
        juego.iniciarPartida();

        return juego.obtenerEstadoJuego();
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> ejecutarJugada(String jugadorId, String tipoJuego, Map<String, Object> parametros) throws Exception {
        Juego juego = store.getJuego(jugadorId, tipoJuego);
        if (juego == null) {
            throw new IllegalStateException("No existe una partida activa para ese jugador/tipo de juego.");
        }

        Object res = juego.ejecutarJugada(parametros);
        // La mayoría de nuestras implementaciones devuelven obtenerEstadoJuego()
        if (res instanceof Map) {
            return (Map<String, Object>) res;
        }
        return juego.obtenerEstadoJuego();
    }

    public Map<String, Object> obtenerEstadoJuego(String jugadorId, String tipoJuego) throws Exception {
        Juego juego = store.getJuego(jugadorId, tipoJuego);
        if (juego == null) {
            throw new IllegalStateException("No existe una partida activa para ese jugador/tipo de juego.");
        }
        return juego.obtenerEstadoJuego();
    }

    public void finalizarJuego(String jugadorId, String tipoJuego) {
        store.removeJuego(jugadorId, tipoJuego);
    }
}
