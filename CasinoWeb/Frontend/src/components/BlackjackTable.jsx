import React from "react";
import Card from "./Card";

export default function BlackjackTable({ cartasJugador, cartasDealer, juegoTerminado }) {
    return (
        <div style={{ padding: "20px" }}>
            {/* Mano del Dealer */}
            <div style={{ marginBottom: "40px" }}>
                <h3 style={{ color: "#fff", textAlign: "center" }}>Dealer</h3>
                <div style={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    gap: "10px",
                    flexWrap: "wrap"
                }}>
                    {cartasDealer && cartasDealer.map((carta, index) => (
                        <Card 
                            key={index} 
                            suit={carta.suit}
                            rank={carta.rank}
                            oculta={!juegoTerminado && index === 1}
                        />
                    ))}
                </div>
            </div>

            {/* Separador de mesa */}
            <div style={{ 
                borderTop: "3px dashed #d4af37", 
                margin: "20px auto",
                maxWidth: "400px"
            }} />

            {/* Mano del Jugador */}
            <div>
                <h3 style={{ color: "#fff", textAlign: "center" }}>Tu Mano</h3>
                <div style={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    gap: "10px",
                    flexWrap: "wrap"
                }}>
                    {cartasJugador && cartasJugador.map((carta, index) => (
                        <Card 
                            key={index} 
                            suit={carta.suit}
                            rank={carta.rank}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
