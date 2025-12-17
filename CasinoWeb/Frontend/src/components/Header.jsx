import React from "react";

export default function Header({ usuario, onLogout }) {
    return (
        <header style={{ 
            background: "linear-gradient(90deg, #0d5c36 0%, #1a472a 100%)", 
            padding: "15px 20px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <h1 style={{ 
                    color: "#d4af37", 
                    margin: 0,
                    fontSize: "2rem",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                }}>
                    🎰 Casino ROA 🎰
                </h1>
            </div>

            {usuario && (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "30px"
                }}>
                    {/* Datos del Usuario */}
                    <div style={{
                        background: "rgba(255,255,255,0.1)",
                        padding: "12px 20px",
                        borderRadius: "10px",
                        border: "2px solid #d4af37"
                    }}>
                        <p style={{ 
                            color: "#d4af37", 
                            margin: "0 0 5px 0",
                            fontSize: "0.85rem"
                        }}>
                            👤 {usuario.nombre}
                        </p>
                        <p style={{ 
                            color: "#ffd700", 
                            margin: 0,
                            fontSize: "1.1rem",
                            fontWeight: "bold"
                        }}>
                            💰 ${usuario.fondos?.toFixed(2) || "0.00"}
                        </p>
                    </div>

                    {/* Botón Logout */}
                    <button
                        onClick={onLogout}
                        style={{
                            padding: "10px 20px",
                            background: "#8b0000",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "0.95rem",
                            fontWeight: "bold",
                            cursor: "pointer",
                            transition: "all 0.3s"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = "#bb0000";
                            e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = "#8b0000";
                            e.target.style.transform = "scale(1)";
                        }}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            )}
        </header>
    );
}
