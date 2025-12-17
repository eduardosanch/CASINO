import { useState } from "react";
import { iniciarJuego, enviarJugada, obtenerEstado, finalizarJuego, obtenerDatosUsuario } from "../api/casinoApi";

export function useCasinoGame(idUsuario, jugadorId, tipoJuego) {
    const [estado, setEstado] = useState(null);
    const [apuestaActual, setApuestaActual] = useState(0);
    const [saldoInicialDelJuego, setSaldoInicialDelJuego] = useState(0);

    const iniciar = async (apuesta = 50) => {
        console.log("Hook: iniciar llamado con apuesta:", apuesta, "estado actual:", estado);
        try {
            // Siempre finalizar primero para limpiar cualquier juego anterior
            // Nota: no enviamos ganancia aquí porque es un nuevo juego
            await finalizarJuego(jugadorId, tipoJuego, 0);
            console.log("Hook: juego finalizado, creando nuevo...");
        } catch (e) {
            console.log("Hook: error al finalizar (ignorado)", e);
        }
        
        try {
            // Obtener el saldo actual del usuario desde la BD
            const usuarioData = await obtenerDatosUsuario(idUsuario);
            const saldoActual = usuarioData.fondos || 0;
            
            // El juego debe iniciarse con el saldo actual del usuario
            const data = await iniciarJuego(idUsuario, jugadorId, tipoJuego, saldoActual, apuesta);
            console.log("Hook: nuevo juego iniciado", data);
            setApuestaActual(apuesta); // Guardar la apuesta actual
            setSaldoInicialDelJuego(saldoActual); // Saldo antes de apostar
            setEstado(data);
        } catch (e) {
            console.error("Hook: error al iniciar juego", e);
        }
    };

    const jugar = async (accion) => {
        try {
            const data = await enviarJugada(jugadorId, tipoJuego, accion);
            
            // Si el juego terminó, finalizarlo
            if (data.juegoTerminado) {
                console.log("Hook: juego terminado, finalizando...");
                // El backend se encargará de actualizar el saldo en la BD
                // usando el saldo final del juego
                await finalizarJuego(jugadorId, tipoJuego);
            }
            
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
            // Si hay un juego en progreso, finalizarlo
            if (estado && estado.juegoTerminado) {
                console.log("Hook: salir - finalizando juego");
                await finalizarJuego(jugadorId, tipoJuego);
            }
        } catch (e) {
            console.log("Hook: error al salir (ignorado)", e);
        }
        setEstado(null);
        setApuestaActual(0);
        setSaldoInicialDelJuego(0);
    };

    return {
        estado,
        iniciar,
        jugar,
        refrescar,
        salir
    };
}
