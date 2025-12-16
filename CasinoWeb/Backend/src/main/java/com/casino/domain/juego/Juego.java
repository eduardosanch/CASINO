package com.casino.domain.juego;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

/**
 * Clase abstracta que representa la base para todos los juegos del casino.
 * Proporciona la lógica común: apuestas, saldo, control de estado, etc.
 */
public abstract class Juego {


    //  Atributos protegidos
    private final String juegoId;
    private final String jugadorId;

    private double saldo;
    private double apuestaActual;

    private final LocalDateTime fechaCreacion;
    private LocalDateTime fechaUltimaJugada;

    private EstadoJuego estado;

    private int partidasJugadas;
    private double totalGanancias;
    private double totalPerdidas;


    //  Constructor

    protected Juego(String jugadorId, double saldoInicial) {

        if (jugadorId == null || jugadorId.isBlank()) {
            throw new IllegalArgumentException("El ID del jugador no puede ser nulo o vacío.");
        }

        if (saldoInicial < 0) {
            throw new IllegalArgumentException("El saldo inicial no puede ser negativo.");
        }

        this.juegoId = UUID.randomUUID().toString();
        this.jugadorId = jugadorId;
        this.saldo = saldoInicial;

        this.apuestaActual = 0;
        this.estado = EstadoJuego.READY;

        this.fechaCreacion = LocalDateTime.now();
        this.fechaUltimaJugada = null;

        this.partidasJugadas = 0;
        this.totalGanancias = 0;
        this.totalPerdidas = 0;
    }

   
    //  Métodos abstractos (POLIMORFISMO)

    public abstract void iniciarPartida() throws Exception;

   
    public abstract Object ejecutarJugada(Object parametros) throws Exception;

   
    public abstract Object finalizarPartida() throws Exception;

  
    public abstract Map<String, Object> obtenerEstadoJuego();

    // Gestión de apuestas


    public void apostar(double cantidad) {
       if(validarApuesta(cantidad)) {

            if (cantidad > saldo) {
            throw new IllegalStateException("Saldo insuficiente para apostar $" + cantidad);
        }

        this.saldo -= cantidad;
        this.apuestaActual = cantidad;
       }

    }

    public double calcularGanancia(double multiplicador) {

        if (multiplicador < 0) {
            throw new IllegalArgumentException("El multiplicador no puede ser negativo.");
        }

        double ganancia = apuestaActual * multiplicador;

        this.saldo += ganancia;
        this.totalGanancias += ganancia;
        this.fechaUltimaJugada = LocalDateTime.now();

        return ganancia;
    }

    public double calcularPerdida() {

        double perdida = this.apuestaActual;

        this.totalPerdidas += perdida;
        this.fechaUltimaJugada = LocalDateTime.now();

       
        return perdida;
    }
        //en caso de empate
    public double devolverApuesta() {

        double devuelta = this.apuestaActual;
        this.saldo += devuelta;


        return devuelta;
    }


    // Reinicio estándar del juego 
 

    protected void reiniciarJuego() {
        this.apuestaActual = 0;
        this.estado = EstadoJuego.READY;
        this.partidasJugadas++;
    }

  
    //  Validaciones internas
 
    private boolean validarApuesta(double cantidad) {
        if (cantidad <= 0) {
            throw new IllegalArgumentException("La apuesta debe ser mayor que cero.");
        }

        if (estado != EstadoJuego.READY && estado != EstadoJuego.IN_PROGRESS) {
            throw new IllegalStateException(
                "No se puede apostar en el estado actual del juego: " + estado
            );
        }

        return true;
    }



    public String getJuegoId() {
         return juegoId; 
         }
    public String getJugadorId() { 
        return jugadorId; 
        }
    public double getSaldo() { 
        return saldo;
         }
    public double getApuestaActual() { 
        return apuestaActual;
         }

    public LocalDateTime getFechaCreacion() { 
        return fechaCreacion;
         }
    public LocalDateTime getFechaUltimaJugada() {
         return fechaUltimaJugada;
          }

    public EstadoJuego getEstado() { 
        return estado; 
        }

    public int getPartidasJugadas() { 
        return partidasJugadas;
         }
    public double getTotalGanancias() { 
        return totalGanancias;
         }
    public double getTotalPerdidas() { 
        return totalPerdidas; 
        }

    protected void setEstado(EstadoJuego estado) { 
        this.estado = estado; 
        }
    protected void setSaldo(double saldo) { 
        this.saldo = Math.max(0, saldo);
         }

    //  Información general del juego (DTO interno) 
   

    public JuegoInfo obtenerInfo() {
        return new JuegoInfo(
            juegoId,
            jugadorId,
            this.getClass().getSimpleName(),
            saldo,
            apuestaActual,
            estado,
            partidasJugadas,
            totalGanancias,
            totalPerdidas,
            fechaCreacion,
            fechaUltimaJugada
        );
    }

    public static class JuegoInfo {
        public final String juegoId;
        public final String jugadorId;
        public final String tipoJuego;
        public final double saldo;
        public final double apuestaActual;
        public final EstadoJuego estado;
        public final int partidasJugadas;
        public final double totalGanancias;
        public final double totalPerdidas;
        public final LocalDateTime fechaCreacion;
        public final LocalDateTime fechaUltimaJugada;

        public JuegoInfo(
            String juegoId, String jugadorId, String tipoJuego, double saldo,
            double apuestaActual, EstadoJuego estado, int partidasJugadas,
            double totalGanancias, double totalPerdidas,
            LocalDateTime fechaCreacion, LocalDateTime fechaUltimaJugada
        ) {
            this.juegoId = juegoId;
            this.jugadorId = jugadorId;
            this.tipoJuego = tipoJuego;
            this.saldo = saldo;
            this.apuestaActual = apuestaActual;
            this.estado = estado;
            this.partidasJugadas = partidasJugadas;
            this.totalGanancias = totalGanancias;
            this.totalPerdidas = totalPerdidas;
            this.fechaCreacion = fechaCreacion;
            this.fechaUltimaJugada = fechaUltimaJugada;
        }
    }

    @Override
    public String toString() {
        return String.format(
            "%s [ID: %s, Jugador: %s, Saldo: %.2f, Estado: %s]",
            this.getClass().getSimpleName(),
            juegoId.substring(0, 8),
            jugadorId,
            saldo,
            estado
        );
    }
}
