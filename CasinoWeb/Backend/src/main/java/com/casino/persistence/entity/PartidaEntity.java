package com.casino.persistence.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "partida")
public class PartidaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_partida")
    private Integer idPartida;

    @ManyToOne
    @JoinColumn(name = "id_juego", nullable = false)
    private JuegoEntity juego;

    @Column(name = "fecha")
    private LocalDateTime fecha;

    @Column(name = "dinero_en_juego")
    private BigDecimal dineroEnJuego;

    @Column(name = "resultado")
    private String resultado;

    public PartidaEntity() {
    }

    public PartidaEntity(JuegoEntity juego, BigDecimal dineroEnJuego) {
        this.juego = juego;
        this.dineroEnJuego = dineroEnJuego;
        this.fecha = LocalDateTime.now();
    }

    // Getters y Setters
    public Integer getIdPartida() {
        return idPartida;
    }

    public void setIdPartida(Integer idPartida) {
        this.idPartida = idPartida;
    }

    public JuegoEntity getJuego() {
        return juego;
    }

    public void setJuego(JuegoEntity juego) {
        this.juego = juego;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public BigDecimal getDineroEnJuego() {
        return dineroEnJuego;
    }

    public void setDineroEnJuego(BigDecimal dineroEnJuego) {
        this.dineroEnJuego = dineroEnJuego;
    }

    public String getResultado() {
        return resultado;
    }

    public void setResultado(String resultado) {
        this.resultado = resultado;
    }
}
