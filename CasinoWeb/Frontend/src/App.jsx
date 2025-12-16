import React, { useState } from "react";
import BlackjackPage from "./pages/BlackjackPage";

function App() {
    const [paginaActual, setPaginaActual] = useState("menu");

    const renderPagina = () => {
        switch (paginaActual) {
            case "blackjack":
                return <BlackjackPage onVolverMenu={() => setPaginaActual("menu")} />;
            default:
                return <MenuPrincipal onSeleccionar={setPaginaActual} />;
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "#1a1a2e" }}>
            <header style={{ 
                background: "linear-gradient(90deg, #0d5c36 0%, #1a472a 100%)", 
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
            }}>
                <h1 style={{ 
                    color: "#d4af37", 
                    margin: 0,
                    fontSize: "2.5rem",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                }}>
                    🎰 Casino ROA 🎰
                </h1>
            </header>

            <main style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
                {renderPagina()}
            </main>
        </div>
    );
}

function MenuPrincipal({ onSeleccionar }) {
    const juegos = [
        { id: "blackjack", nombre: "♠ Blackjack ♥", descripcion: "Intenta llegar a 21 sin pasarte", color: "#1a472a" },
        { id: "ruleta", nombre: "🎡 Ruleta", descripcion: "Próximamente...", color: "#8b0000", disabled: true },
        { id: "poker", nombre: "🃏 Poker", descripcion: "Próximamente...", color: "#1e3a5f", disabled: true },
    ];

    return (
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
            <h2 style={{ color: "#fff", marginBottom: "40px" }}>Selecciona un Juego</h2>
            
            <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                gap: "30px",
                flexWrap: "wrap"
            }}>
                {juegos.map(juego => (
                    <div 
                        key={juego.id}
                        onClick={() => !juego.disabled && onSeleccionar(juego.id)}
                        style={{
                            background: juego.color,
                            padding: "40px 30px",
                            borderRadius: "15px",
                            cursor: juego.disabled ? "not-allowed" : "pointer",
                            opacity: juego.disabled ? 0.5 : 1,
                            transition: "transform 0.2s, box-shadow 0.2s",
                            border: "3px solid #d4af37",
                            minWidth: "200px",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
                        }}
                        onMouseEnter={(e) => {
                            if (!juego.disabled) {
                                e.currentTarget.style.transform = "scale(1.05)";
                                e.currentTarget.style.boxShadow = "0 8px 25px rgba(212,175,55,0.4)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
                        }}
                    >
                        <h3 style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "10px" }}>
                            {juego.nombre}
                        </h3>
                        <p style={{ color: "#ccc", margin: 0 }}>
                            {juego.descripcion}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
