import React from "react";

export default function PlayerStats({ 
    puntajeJugador, 
    puntajeDealer, 
    estadoJuego, 
    resultado,
    saldo 
}) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-around",
            background: "rgba(0,0,0,0.3)",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
            color: "#fff"
        }}>
            <div style={statBox}>
                <span style={labelStyle}>Tu Puntaje</span>
                <span style={valueStyle}>{puntajeJugador ?? "-"}</span>
            </div>
            
            <div style={statBox}>
                <span style={labelStyle}>Puntaje Dealer</span>
                <span style={valueStyle}>{puntajeDealer ?? "?"}</span>
            </div>

            <div style={statBox}>
                <span style={labelStyle}>Estado</span>
                <span style={{...valueStyle, fontSize: "14px"}}>
                    {estadoJuego || "En juego"}
                </span>
            </div>

            {saldo !== undefined && (
                <div style={statBox}>
                    <span style={labelStyle}>Saldo</span>
                    <span style={{...valueStyle, color: "#d4af37"}}>
                        ${saldo}
                    </span>
                </div>
            )}
        </div>
    );
}

const statBox = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px"
};

const labelStyle = {
    fontSize: "12px",
    color: "#aaa",
    textTransform: "uppercase"
};

const valueStyle = {
    fontSize: "24px",
    fontWeight: "bold"
};
