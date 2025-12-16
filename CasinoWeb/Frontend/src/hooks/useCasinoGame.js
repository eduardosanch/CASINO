import { useState } from "react";
import { iniciarJuego, enviarJugada, obtenerEstado, finalizarJuego } from "../api/casinoApi";

export function useCasinoGame(jugadorId, tipoJuego) {
    const [estado, setEstado] = useState(null);

    const iniciar = async () => {
        console.log("Hook: iniciar llamado, estado actual:", estado);
        try {
            // Siempre finalizar primero para limpiar cualquier juego anterior
            await finalizarJuego(jugadorId, tipoJuego);
            console.log("Hook: juego finalizado, creando nuevo...");
        } catch (e) {
            console.log("Hook: error al finalizar (ignorado)", e);
        }
        
        try {
            const data = await iniciarJuego(jugadorId, tipoJuego);
            console.log("Hook: nuevo juego iniciado", data);
            setEstado(data);
        } catch (e) {
            console.error("Hook: error al iniciar juego", e);
        }
    };

    const jugar = async (accion) => {
        try {
            const data = await enviarJugada(jugadorId, tipoJuego, accion);
            setEstado(data);
        } catch (e) {
            console.error("Hook: error al jugar", e);
        }
    };

    const refrescar = async () => {
        try {
            const data = await obtenerEstado(jugadorId, tipoJuego);
            setEstado(data);
        } catch (e) {
            console.error("Hook: error al refrescar", e);
        }
    };

    const salir = async () => {
        try {
            await finalizarJuego(jugadorId, tipoJuego);
        } catch (e) {
            console.log("Hook: error al salir (ignorado)", e);
        }
        setEstado(null);
    };

    return {
        estado,
        iniciar,
        jugar,
        refrescar,
        salir
    };
}
