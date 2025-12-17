package com.casino.api.dto;

import java.math.BigDecimal;

public class IniciarRequest {
    private Integer idUsuario;
    private String jugadorId;
    private String tipoJuego;
    private BigDecimal saldoInicial;
    private BigDecimal apuesta;

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getJugadorId() {
        return jugadorId;
    }

    public void setJugadorId(String jugadorId) {
        this.jugadorId = jugadorId;
    }

    public String getTipoJuego() {
        return tipoJuego;
    }

    public void setTipoJuego(String tipoJuego) {
        this.tipoJuego = tipoJuego;
    }

    public BigDecimal getSaldoInicial() {
        return saldoInicial;
    }

    public void setSaldoInicial(BigDecimal saldoInicial) {
        this.saldoInicial = saldoInicial;
    }

    public BigDecimal getApuesta() {
        return apuesta;
    }

    public void setApuesta(BigDecimal apuesta) {
        this.apuesta = apuesta;
    }
}
