package com.casino.domain.cartas;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * Representa una carta individual de un mazo.
 * Utilizada por todos los juegos basados en cartas.
 */

public class Carta{

    public enum Palo {
        HEARTS("♥️", "Corazones"),
        DIAMONDS("♦️", "Diamantes"),
        CLUBS("♣️", "Tréboles"),
        SPADES("♠️", "Espadas");

        private final String simbolo;
        private final String nombre;

        Palo(String simbolo, String nombre) {
            this.simbolo = simbolo;
            this.nombre = nombre;
        }

        public String getSimbolo() {
            return simbolo;
        }

        public String getNombre() {
            return nombre;
        }
    }

    public enum Valor {
        AS("A", 1, 11),
        DOS("2", 2, 2),
        TRES("3", 3, 3),
        CUATRO("4", 4, 4),
        CINCO("5", 5, 5),
        SEIS("6", 6, 6),
        SIETE("7", 7, 7),
        OCHO("8", 8, 8),
        NUEVE("9", 9, 9),
        DIEZ("10", 10, 10),
        JOTA/*uri*/("J", 11, 10),
        REINA("Q", 12, 10),
        REY("K", 13, 10);

        private final String simbolo;
        private final int orden;
        private final int valorBlackjack;

        Valor(String simbolo, int orden, int valorBlackjack) {
            this.simbolo = simbolo;
            this.orden = orden;
            this.valorBlackjack = valorBlackjack;
        }

        public String getSimbolo() {
            return simbolo;
        }

        public int getOrden() {
            return orden;
        }

        /**
         * Solo es utilizado por Blackjack.
         */
        public int getValorBlackjack() {
            return valorBlackjack;
        }
    }

    private final Palo palo;
    private final Valor valor;

    public Carta(Palo palo, Valor valor) {
        this.palo = palo;
        this.valor = valor;
    }

    public Palo getPalo() {
        return palo;
    }

    public Valor getValor() {
        return valor;
    }

    @Override
    public String toString() {
        return valor.getSimbolo() + palo.getSimbolo();
    }

    /**
     * Formato simplificado para UI (React)
     */
    public Map<String, String> toUIFormat() {
        Map<String, String> map = new HashMap<>();
        map.put("suit", palo.name());
        map.put("rank", valor.getSimbolo());
        return map;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Carta)) return false;
        Carta carta = (Carta) obj;
        return palo == carta.palo && valor == carta.valor;
    }

    @Override
    public int hashCode() {
        return Objects.hash(palo, valor);
    }

}