package com.casino.domain.juego;

import com.casino.domain.cartas.Carta;
import com.casino.domain.cartas.Mazo;
import com.casino.domain.cartas.Mano;

public abstract class JuegoConCartas extends Juego {

    protected Mazo mazo;
    protected Mano manoJugador;
    protected Mano manoDealer;

    protected boolean juegoTerminado;
    protected String ultimaAccion;

    protected JuegoConCartas(String jugadorId, double saldoInicial) {
        super(jugadorId, saldoInicial);

        this.mazo = new Mazo();
        this.manoJugador = new Mano("Jugador");
        this.manoDealer = new Mano("Dealer");

        this.juegoTerminado = false;
        this.ultimaAccion = "Juego creado";
    }

    @Override
    public void iniciarPartida() throws Exception {
        if (getEstado() != EstadoJuego.READY) {
            throw new IllegalStateException("El juego debe estar en estado READY para iniciar.");
        }

        manoJugador.limpiar();
        manoDealer.limpiar();
        juegoTerminado = false;

        if (mazo.cartasRestantes() < 10) {
            mazo.reiniciar();
        }

        ultimaAccion = "Partida iniciada";
        setEstado(EstadoJuego.IN_PROGRESS);
    }

    @Override
    public Object finalizarPartida() {
        if (getEstado() != EstadoJuego.IN_PROGRESS) {
            throw new IllegalStateException("No hay una partida en progreso.");
        }

        juegoTerminado = true;
        setEstado(EstadoJuego.FINISHED);
        ultimaAccion = "Partida finalizada";

        reiniciarJuego();
        return obtenerEstadoJuego();
    }

    // -------- MÉTODOS DISPONIBLES PARA JUEGOS -------------


    protected Carta repartirCartaJugador() {
        Carta carta = mazo.repartirCarta();
        manoJugador.agregarCarta(carta);
        ultimaAccion = "Carta repartida al jugador";
        return carta;
    }

    protected Carta repartirCartaDealer() {
        Carta carta = mazo.repartirCarta();
        manoDealer.agregarCarta(carta);
        ultimaAccion = "Carta repartida al dealer";
        return carta;
    }

    public Mano getManoJugador() {
        return manoJugador;
    }

    public Mano getManoDealer() {
        return manoDealer;
    }

    // Métodos abstractos para que cada juego calcule el puntaje a su manera
    public abstract int getPuntajeJugador();
    public abstract int getPuntajeDealer();

    public String getUltimaAccion() {
        return ultimaAccion;
    }

    public int getCartasEnMazo() {
        return mazo.cartasRestantes();
    }
}
