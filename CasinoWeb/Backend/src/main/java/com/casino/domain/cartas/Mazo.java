package com.casino.domain.cartas; 

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;


/**
 * Representa un mazo estándar de 52 cartas.
 * Puede usarse por cualquier juego basado en cartas.
 */

public class Mazo {

    private List<Carta> cartas;
    private final Random random;

    public Mazo() {
        this.random = new Random();
        this.cartas = new ArrayList<>();
        crearMazo();
        barajar();
    }

    private void crearMazo() {
        cartas.clear();
        for (Carta.Palo palo : Carta.Palo.values()) {
            for (Carta.Valor valor : Carta.Valor.values()) {
                cartas.add(new Carta(palo, valor));
            }
        }
    }

    public void barajar() {
        for (int i = cartas.size() - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            Collections.swap(cartas, i, j);
        }
    }

    public Carta repartirCarta() {
        if (cartas.isEmpty()) {
            throw new IllegalStateException("El mazo no tiene más cartas.");
        }
        return cartas.remove(cartas.size() - 1);
    }

    public void reiniciar() {
        crearMazo();
        barajar();
    }

    public int cartasRestantes() {
        return cartas.size();
    }

    public boolean estaVacio() {
        return cartas.isEmpty();
    }
}