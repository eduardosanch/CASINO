package com.casino.api.dto;

import java.util.Map;

public class JugadaRequest {
    private String jugadorId;
    private String tipoJuego;
    private Map<String, Object> parametros; // { "accion": "PEDIR", ... }

    public String getJugadorId() { return jugadorId; }
    public void setJugadorId(String jugadorId) { this.jugadorId = jugadorId; }

    public String getTipoJuego() { return tipoJuego; }
    public void setTipoJuego(String tipoJuego) { this.tipoJuego = tipoJuego; }

    public Map<String, Object> getParametros() { return parametros; }
    public void setParametros(Map<String, Object> parametros) { this.parametros = parametros; }
}
