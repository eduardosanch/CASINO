package com.casino.domain.cartas;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Representa una mano de cartas (jugador o dealer).
 * 
 */

public class Mano {

    private final String propietario;
    private final List<Carta> cartas;

    public Mano(String propietario) {
        this.propietario = propietario;
        this.cartas = new ArrayList<>();
    }

    public void agregarCarta(Carta carta) {
        cartas.add(carta);
    }

    public void limpiar() {
        cartas.clear();
    }

    public List<Carta> getCartas() {
        return new ArrayList<>(cartas); // Copia defensiva
    }

    public int getCantidadCartas() {
        return cartas.size();
    }

    public boolean estaVacia() {
        return cartas.isEmpty();
    }

    public String getPropietario() {
        return propietario;
    }

    /**
     * Implementación general — puede ser sobrescrita por juegos específicos.
     */
    public int getPuntajeGeneral() {
        return cartas.size(); // Ejemplo placeholder
    }

    /**
     * Calcula el puntaje para Blackjack (considera el As como 1 u 11)
     */
    public int getPuntaje() {
        int total = 0;
        int ases = 0;

        for (Carta carta : cartas) {
            int valor = carta.getValor().getValorBlackjack();
            if (carta.getValor() == Carta.Valor.AS) {
                ases++;
            }
            total += valor;
        }

        // Si tenemos ases y nos pasamos de 21, contar el as como 1 en vez de 11
        while (total > 21 && ases > 0) {
            total -= 10; // Convertir un As de 11 a 1
            ases--;
        }

        return total;
    }

    /**
     * Convierte cartas a formato UI.
     */
    public List<Map<String, String>> getCartasParaUI() {
        return cartas.stream()
                .map(Carta::toUIFormat)
                .collect(Collectors.toList());
    }

    @Override
    public String toString() {
        return propietario + ": " + cartas;
    }

}