package com.casino.persistence.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "partida_jugador")
public class PartidaJugadorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_partida_jugador")
    private Integer idPartidaJugador;

    @ManyToOne
    @JoinColumn(name = "id_partida", nullable = false)
    private PartidaEntity partida;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private UsuarioEntity usuario;

    @Column(name = "rol")
    private String rol;

    @Column(name = "dinero_apostado")
    private BigDecimal dineroApostado;

    @Column(name = "resultado")
    private String resultado;

    public PartidaJugadorEntity() {
    }

    public PartidaJugadorEntity(PartidaEntity partida, UsuarioEntity usuario, String rol, BigDecimal dineroApostado) {
        this.partida = partida;
        this.usuario = usuario;
        this.rol = rol;
        this.dineroApostado = dineroApostado;
    }

    // Getters y Setters
    public Integer getIdPartidaJugador() {
        return idPartidaJugador;
    }

    public void setIdPartidaJugador(Integer idPartidaJugador) {
        this.idPartidaJugador = idPartidaJugador;
    }

    public PartidaEntity getPartida() {
        return partida;
    }

    public void setPartida(PartidaEntity partida) {
        this.partida = partida;
    }

    public UsuarioEntity getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioEntity usuario) {
        this.usuario = usuario;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public BigDecimal getDineroApostado() {
        return dineroApostado;
    }

    public void setDineroApostado(BigDecimal dineroApostado) {
        this.dineroApostado = dineroApostado;
    }

    public String getResultado() {
        return resultado;
    }

    public void setResultado(String resultado) {
        this.resultado = resultado;
    }
}
