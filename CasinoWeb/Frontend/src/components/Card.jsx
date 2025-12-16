import React from "react";

export default function Card({ valor, palo, suit, rank, oculta = false }) {
    // Si la carta está oculta, mostrar el reverso
    if (oculta) {
        return (
            <img 
                src="/cards/back.png" 
                alt="Carta oculta"
                style={cardStyle}
            />
        );
    }

    // El backend puede enviar suit/rank o valor/palo
    const actualPalo = suit || palo;
    const actualValor = rank || valor;

    // Mapear palo a letra para el nombre del archivo
    const paloMap = {
        "CORAZONES": "H",
        "DIAMANTES": "D", 
        "TREBOLES": "C",
        "PICAS": "S",
        "HEARTS": "H",
        "DIAMONDS": "D",
        "CLUBS": "C",
        "SPADES": "S"
    };

    // El valor ya viene como símbolo (A, 2, 3, ..., J, Q, K)
    const valorArchivo = actualValor;
    const paloArchivo = paloMap[actualPalo?.toUpperCase()] || actualPalo;

    const nombreArchivo = `${valorArchivo}${paloArchivo}.png`;

    return (
        <img 
            src={`/cards/${nombreArchivo}`}
            alt={`${actualValor} de ${actualPalo}`}
            style={cardStyle}
            onError={(e) => {
                // Fallback si la imagen no existe
                e.target.style.display = 'none';
            }}
        />
    );
}

const cardStyle = {
    width: "80px",
    height: "120px",
    borderRadius: "8px",
    boxShadow: "2px 2px 8px rgba(0,0,0,0.5)"
};
