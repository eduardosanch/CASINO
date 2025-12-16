package com.casino.api.dto;

public class IniciarRequest {
    private String jugadorId;
    private String tipoJuego;
    private Double saldoInicial;
    private Double apuesta;
    

    public String getJugadorId() { return jugadorId; }
    public void setJugadorId(String jugadorId) { this.jugadorId = jugadorId; }

    public String getTipoJuego() { return tipoJuego; }
    public void setTipoJuego(String tipoJuego) { this.tipoJuego = tipoJuego; }

    public Double getSaldoInicial() { return saldoInicial; }
    public void setSaldoInicial(Double saldoInicial) { this.saldoInicial = saldoInicial; }

    public Double getApuesta() { return apuesta; }
    public void setApuesta(Double apuesta) { this.apuesta = apuesta; }
}
