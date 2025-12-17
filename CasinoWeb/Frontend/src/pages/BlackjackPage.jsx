import React from "react";
import { useCasinoGame } from "../hooks/useCasinoGame";
import BlackjackTable from "../components/BlackjackTable";
import PlayerStats from "../components/PlayerStats";

export default function BlackjackPage({ onVolverMenu, usuario }) {
    const idUsuario = usuario?.idUsuario || 1;
    const jugadorId = String(idUsuario);
    const [apuesta, setApuesta] = React.useState(50);

    const { estado, iniciar, jugar, salir } = useCasinoGame(idUsuario, jugadorId, "BLACKJACK");

    const handleVolverMenu = async () => {
        await salir();
        if (onVolverMenu) {
            onVolverMenu();
        }
    };

    const handleIniciarConApuesta = () => {
        iniciar(apuesta);
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
                    <div style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        padding: "30px",
                        borderRadius: "10px",
                        maxWidth: "400px",
                        margin: "0 auto 30px",
                        borderLeft: "4px solid #d4af37"
                    }}>
                        <label style={{ 
                            color: "#d4af37", 
                            fontSize: "18px", 
                            fontWeight: "bold",
                            display: "block",
                            marginBottom: "15px"
                        }}>
                            💰 Selecciona tu apuesta:
                        </label>
                        <div style={{ marginBottom: "20px" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "15px" }}>
                                {[50, 100, 250, 500].map((valor) => (
                                    <button
                                        key={valor}
                                        onClick={() => setApuesta(valor)}
                                        style={{
                                            padding: "10px",
                                            fontSize: "16px",
                                            background: apuesta === valor ? "#d4af37" : "#2e7d32",
                                            color: apuesta === valor ? "#000" : "#fff",
                                            border: `2px solid ${apuesta === valor ? "#fff" : "#d4af37"}`,
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            transition: "all 0.3s ease"
                                        }}
                                    >
                                        ${valor}
                                    </button>
                                ))}
                            </div>
                            <input 
                                type="number" 
                                min="10" 
                                max="1000" 
                                value={apuesta}
                                onChange={(e) => setApuesta(Math.max(10, parseInt(e.target.value) || 10))}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    fontSize: "16px",
                                    borderRadius: "6px",
                                    border: "2px solid #d4af37",
                                    boxSizing: "border-box",
                                    background: "#1a472a",
                                    color: "#d4af37",
                                    textAlign: "center"
                                }}
                            />
                        </div>
                        <p style={{ color: "#aaa", fontSize: "14px", marginBottom: "20px" }}>
                            Apuesta actual: <span style={{ color: "#d4af37", fontSize: "18px", fontWeight: "bold" }}>${apuesta}</span>
                        </p>
                    </div>
                    <button 
                        onClick={handleIniciarConApuesta}
                        style={{
                            padding: "15px 40px",
                            fontSize: "18px",
                            background: "#d4af37",
                            color: "#000",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        🎰 Iniciar Partida
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
                            <div style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                padding: "20px",
                                borderRadius: "10px",
                                maxWidth: "400px",
                                margin: "0 auto 20px",
                                borderLeft: "4px solid #d4af37"
                            }}>
                                <label style={{ 
                                    color: "#d4af37", 
                                    fontSize: "16px", 
                                    fontWeight: "bold",
                                    display: "block",
                                    marginBottom: "10px"
                                }}>
                                    💰 Nueva apuesta:
                                </label>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "15px" }}>
                                    {[50, 100, 250, 500].map((valor) => (
                                        <button
                                            key={valor}
                                            onClick={() => setApuesta(valor)}
                                            style={{
                                                padding: "8px",
                                                fontSize: "14px",
                                                background: apuesta === valor ? "#d4af37" : "#2e7d32",
                                                color: apuesta === valor ? "#000" : "#fff",
                                                border: `2px solid ${apuesta === valor ? "#fff" : "#d4af37"}`,
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            ${valor}
                                        </button>
                                    ))}
                                </div>
                                <input 
                                    type="number" 
                                    min="10" 
                                    max="1000" 
                                    value={apuesta}
                                    onChange={(e) => setApuesta(Math.max(10, parseInt(e.target.value) || 10))}
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        fontSize: "14px",
                                        borderRadius: "6px",
                                        border: "2px solid #d4af37",
                                        boxSizing: "border-box",
                                        background: "#1a472a",
                                        color: "#d4af37",
                                        textAlign: "center"
                                    }}
                                />
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                                <button onClick={handleIniciarConApuesta} style={btnStyle}>
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
