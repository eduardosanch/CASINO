// --- API UNIFICADA PARA TODOS LOS JUEGOS ---
const API_URL = "http://localhost:8080/api/juego";

// Iniciar partida
export const iniciarJuego = async (jugadorId, tipoJuego, saldoInicial = 1000) => {
    console.log("API: iniciarJuego", jugadorId, tipoJuego, saldoInicial);
    const res = await fetch(`${API_URL}/iniciar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jugadorId, tipoJuego, saldoInicial })
    });
    const data = await res.json();
    console.log("API: iniciarJuego respuesta", data);
    return data;
};

// Ejecutar jugada
export const enviarJugada = async (jugadorId, tipoJuego, accion) => {
    console.log("API: enviarJugada", jugadorId, tipoJuego, accion);
    const res = await fetch(`${API_URL}/jugada`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            jugadorId, 
            tipoJuego, 
            parametros: { accion }
        })
    });
    const data = await res.json();
    console.log("API: enviarJugada respuesta", data);
    return data;
};

// Obtener estado actual del juego
export const obtenerEstado = async (jugadorId, tipoJuego) => {
    const res = await fetch(
        `${API_URL}/estado?jugadorId=${jugadorId}&tipoJuego=${tipoJuego}`
    );
    return res.json();
};

// Finalizar juego (para poder iniciar uno nuevo)
export const finalizarJuego = async (jugadorId, tipoJuego) => {
    console.log("API: finalizarJuego", jugadorId, tipoJuego);
    const res = await fetch(
        `${API_URL}/finalizar?jugadorId=${jugadorId}&tipoJuego=${tipoJuego}`,
        { method: "POST" }
    );
    // No intentar parsear JSON si no hay body
    if (res.ok) {
        console.log("API: finalizarJuego OK");
        return { status: "OK" };
    }
    return { status: "ERROR" };
};