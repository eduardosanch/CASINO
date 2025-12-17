package com.casino.domain.cartas.blackjack;

import com.casino.domain.juego.EstadoJuego;
import com.casino.domain.juego.JuegoConCartas;
import com.casino.domain.cartas.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Blackjack extends JuegoConCartas {
    
    private ResultadoBlackjack resultado;
    private boolean puedeDoblar;
    private boolean puedeRendirse;
    private boolean turnoTerminado;

    public Blackjack(String jugadorId, double saldoInicial) {
        super(jugadorId, saldoInicial);
        resultado = ResultadoBlackjack.EN_PROGRESO;
    }

    
    //  INICIO DE PARTIDA
   
//ejemplo de polimorfismo y herencia, llama a iniciarPartida de la clase padre juego y la usa 
// a su manera 
    @Override
    public void iniciarPartida() throws Exception {
        super.iniciarPartida();

        puedeDoblar = true;
        puedeRendirse = true;
        turnoTerminado = false;

        // Repartir cartas iniciales 
        repartirCartaJugador();
        repartirCartaDealer();
        repartirCartaJugador();
        repartirCartaDealer();

        // Verificar blackjack
        verificarBlackjackInicial();
    }

    private void verificarBlackjackInicial() {
        int puntajeJ = getPuntajeJugador();
        int puntajeD = getPuntajeDealer();
//validammos si alguno de los 2 tiene 21, si es asi, se acaba el juego 
        boolean jBlackjack = (puntajeJ == 21);
        boolean dBlackjack = (puntajeD == 21);

        if (jBlackjack || dBlackjack) {
            turnoTerminado = true;
            juegoTerminado = true;

            if (jBlackjack && dBlackjack) {
                resultado = ResultadoBlackjack.EMPATE;
                devolverApuesta();
            } else if (jBlackjack) {
                resultado = ResultadoBlackjack.BLACKJACK_JUGADOR;
                calcularGanancia(2.5);
            } else {
                resultado = ResultadoBlackjack.BLACKJACK_DEALER;
                calcularPerdida();
            }

            setEstado(EstadoJuego.FINISHED);
        }
    }

  
    //  ACCIONES DEL JUGADOR
   

    public void pedirCarta() {
        validarAccionJugador();

        repartirCartaJugador();
        puedeDoblar = false;
        puedeRendirse = false;

        if (getPuntajeJugador() > 21) {
            resultado = ResultadoBlackjack.JUGADOR_SE_PASA;
            finalizarRondaConPerdida();
        }
    }

    public void plantarse() {
        validarAccionJugador();

        turnoTerminado = true;
        turnoDelDealer();
    }

    public void doblar() {
        validarAccionJugador();

        if (!puedeDoblar) {
            throw new IllegalStateException("No puedes doblar en este momento.");
        }

        apostar(getApuestaActual()); // duplicar apuesta

        repartirCartaJugador();
        turnoTerminado = true;

        if (getPuntajeJugador() > 21) {
            resultado = ResultadoBlackjack.JUGADOR_SE_PASA;
            finalizarRondaConPerdida();
        } else {
            turnoDelDealer();
        }
    }

    public void rendirse() {
        validarAccionJugador();

        if (!puedeRendirse) {
            throw new IllegalStateException("No puedes rendirte después de pedir carta.");
        }

        resultado = ResultadoBlackjack.RENDICION;
        saldoParcialRendicion();
        juegoTerminado = true;
        setEstado(EstadoJuego.FINISHED);
    }

    private void saldoParcialRendicion() {
        double devolver = getApuestaActual() / 2;
        setSaldo(getSaldo() + devolver);
    }

    
    //  TURNO DEL DEALER
    

    private void turnoDelDealer() {
        while (getPuntajeDealer() < 17) {
            repartirCartaDealer();
        }

        evaluarResultadoFinal();
    }

    private void evaluarResultadoFinal() {
        int jugador = getPuntajeJugador();
        int dealer = getPuntajeDealer();

        if (dealer > 21) {
            resultado = ResultadoBlackjack.DEALER_SE_PASA;
            calcularGanancia(2.0);
        } else if (jugador > dealer) {
            resultado = ResultadoBlackjack.JUGADOR_GANA;
            calcularGanancia(2.0);
        } else if (jugador < dealer) {
            resultado = ResultadoBlackjack.DEALER_GANA;
            calcularPerdida();
        } else {
            resultado = ResultadoBlackjack.EMPATE;
            devolverApuesta();
        }

        juegoTerminado = true;
        setEstado(EstadoJuego.FINISHED);
    }

    private void finalizarRondaConPerdida() {
        calcularPerdida();
        juegoTerminado = true;
        setEstado(EstadoJuego.FINISHED);
    }

    private void validarAccionJugador() {
        if (getEstado() != EstadoJuego.IN_PROGRESS)
            throw new IllegalStateException("No hay partida activa.");
        if (turnoTerminado)
            throw new IllegalStateException("El turno del jugador ya terminó.");
    }

    // -------- CÁLCULO DE PUNTAJE ESPECÍFICO PARA BLACKJACK --------
    
    @Override
    public int getPuntajeJugador() {
        return calcularPuntajeBlackjack(manoJugador);
    }

    @Override
    public int getPuntajeDealer() {
        return calcularPuntajeBlackjack(manoDealer);
    }

    /**
     El As vale 11 si no se pasa de 21, sino vale 1.
     */
    private int calcularPuntajeBlackjack(Mano mano) {
        int puntaje = 0;
        int ases = 0;

        for (Carta carta : mano.getCartas()) {
            int valor = carta.getValor().getValorBlackjack();
            if (carta.getValor() == Carta.Valor.AS) {
                ases++;
                puntaje += 11; // Inicialmente contamos el As como 11
            } else {
                puntaje += valor;   
            }
        }

        // Ajustar ases de 11 a 1 si nos pasamos de 21
        while (puntaje > 21 && ases > 0) {
            puntaje -= 10;
            ases--;
        }

        return puntaje;
    }


    private void evaluarJuego() {
    int puntajeJugador = getPuntajeJugador();
    int puntajeDealer = getPuntajeDealer();

    if (puntajeJugador > 21) {
        resultado = ResultadoBlackjack.JUGADOR_SE_PASA;
        calcularPerdida();
        return;
    }

    if (puntajeDealer > 21) {
        resultado = ResultadoBlackjack.DEALER_SE_PASA;
        calcularGanancia(2.0);
        return;
    }

    if (puntajeJugador > puntajeDealer) {
        resultado = ResultadoBlackjack.JUGADOR_GANA;
        calcularGanancia(2.0);
        return;
    }

    if (puntajeDealer > puntajeJugador) {
        resultado = ResultadoBlackjack.DEALER_GANA;
        calcularPerdida();
        return;
    }

    // Empate
    resultado = ResultadoBlackjack.EMPATE;
    devolverApuesta();
}

    
    //  Implementación de métodos abstractos
   

    @Override
    public Object ejecutarJugada(Object parametros) throws Exception {
        if (!(parametros instanceof Map)) {
            throw new IllegalArgumentException("Los parámetros deben ser un Map");
        }

        Map<String, Object> data = (Map<String, Object>) parametros;
        String accion = (String) data.get("accion");

        if (accion == null) {
            throw new IllegalArgumentException("Debe especificarse la acción a ejecutar");
        }

        switch (accion.toUpperCase()) {
            case "PEDIR":
                pedirCarta();
                break;

            case "PLANTARSE":
                plantarse();
                break;

            case "DOBLAR":
                doblar();
                break;

            case "RENDIRSE":
                rendirse();
                break;

            default:
                throw new IllegalArgumentException("Acción no reconocida: " + accion);
        }
        
        return obtenerEstadoJuego();
    }

    @Override
    public Map<String, Object> obtenerEstadoJuego() {
        Map<String, Object> estado = new HashMap<>();

        estado.put("estadoJuego", getEstado());
        estado.put("resultado", resultado);
        estado.put("ultimaAccion", ultimaAccion);
        estado.put("juegoTerminado", juegoTerminado);
        estado.put("saldo", getSaldo()); // Incluir el saldo actual del juego

        estado.put("cartasJugador", manoJugador.getCartasParaUI());
        estado.put("puntajeJugador", manoJugador.getPuntaje());

        // Mostrar una sola carta del dealer si no ha terminado
        if (!juegoTerminado) {
            List<Map<String, String>> visible = new ArrayList<>();
            visible.add(manoDealer.getCartas().get(0).toUIFormat()); // primera carta visible
            estado.put("cartasDealer", visible);
            estado.put("puntajeDealer", null);
        } else {
            estado.put("cartasDealer", manoDealer.getCartasParaUI());
            estado.put("puntajeDealer", manoDealer.getPuntaje());
        }

        return estado;
    }




}


