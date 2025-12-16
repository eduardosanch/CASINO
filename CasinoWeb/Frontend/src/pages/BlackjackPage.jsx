import React from "react";
import { useCasinoGame } from "../hooks/useCasinoGame";
import BlackjackTable from "../components/BlackjackTable";
import PlayerStats from "../components/PlayerStats";

export default function BlackjackPage({ onVolverMenu }) {
    const jugadorId = "PLAYER123";

    const { estado, iniciar, jugar, salir } = useCasinoGame(jugadorId, "BLACKJACK");

    const handleVolverMenu = async () => {
        await salir();
        if (onVolverMenu) {
            onVolverMenu();
        }
    };

    return (
        <div style={{ 
            minHeight: "80vh", 
            background: "#1a472a", 
            padding: "20px",
            borderRadius: "10px"
        }}>
            <h2 style={{ color: "#fff", textAlign: "center" }}>♠ Blackjack ♥</h2>

            {!estado && (
                <div style={{ textAlign: "center", marginTop: "40px" }}>
                    <button 
                        onClick={iniciar}
                        style={{
                            padding: "15px 40px",
                            fontSize: "18px",
                            background: "#d4af37",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        Iniciar Partida
                    </button>
                    {onVolverMenu && (
                        <button 
                            onClick={onVolverMenu}
                            style={{
                                padding: "15px 40px",
                                fontSize: "18px",
                                background: "#555",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                marginLeft: "15px"
                            }}
                        >
                            Volver al Menú
                        </button>
                    )}
                </div>
            )}

            {estado && (
                <>
                    <PlayerStats
                        puntajeJugador={estado.puntajeJugador}
                        puntajeDealer={estado.puntajeDealer}
                        estadoJuego={estado.estadoJuego}
                        resultado={estado.resultado}
                        saldo={estado.saldo}
                    />

                    <BlackjackTable
                        cartasJugador={estado.cartasJugador || []}
                        cartasDealer={estado.cartasDealer || []}
                        juegoTerminado={estado.juegoTerminado}
                    />

                    {!estado.juegoTerminado && (
                        <div style={{ 
                            display: "flex", 
                            justifyContent: "center", 
                            gap: "10px",
                            marginTop: "30px" 
                        }}>
                            <button onClick={() => jugar("PEDIR")} style={btnStyle}>
                                Pedir Carta
                            </button>
                            <button onClick={() => jugar("PLANTARSE")} style={btnStyle}>
                                Plantarse
                            </button>
                            <button onClick={() => jugar("DOBLAR")} style={btnStyle}>
                                Doblar
                            </button>
                            <button onClick={() => jugar("RENDIRSE")} style={{...btnStyle, background: "#8b0000"}}>
                                Rendirse
                            </button>
                        </div>
                    )}

                    {estado.juegoTerminado && (
                        <div style={{ textAlign: "center", marginTop: "30px" }}>
                            <p style={{ color: "#d4af37", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
                                {estado.resultado}
                            </p>
                            <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                                <button onClick={iniciar} style={btnStyle}>
                                    🔄 Nueva Partida
                                </button>
                                <button 
                                    onClick={handleVolverMenu} 
                                    style={{...btnStyle, background: "#555"}}
                                >
                                    🏠 Volver al Menú
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

const btnStyle = {
    padding: "12px 25px",
    fontSize: "16px",
    background: "#2e7d32",
    color: "#fff",
    border: "2px solid #d4af37",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
};
