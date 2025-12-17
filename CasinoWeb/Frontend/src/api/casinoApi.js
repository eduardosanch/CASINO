// --- API UNIFICADA PARA TODOS LOS JUEGOS ---
const API_URL = "http://localhost:8080/api/juego";
const AUTH_URL = "http://localhost:8080/api/auth";

// ===== AUTENTICACIÓN =====

// Registrar nuevo usuario
export const registrarUsuario = async (nombre, correo, contraseña) => {
    console.log("API: registrarUsuario", nombre, correo);
    const res = await fetch(`${AUTH_URL}/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, contraseña })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al registrar");
    console.log("API: usuario registrado", data);
    return data;
};

// Login de usuario
export const loginUsuario = async (correo, contraseña) => {
    console.log("API: loginUsuario", correo);
    const res = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contraseña })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al iniciar sesión");
    console.log("API: login exitoso", data);
    return data;
};

// Obtener datos del usuario
export const obtenerDatosUsuario = async (idUsuario) => {
    console.log("API: obtenerDatosUsuario", idUsuario);
    const res = await fetch(`${AUTH_URL}/usuario/${idUsuario}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al obtener usuario");
    return data;
};

// Actualizar saldo del usuario en la BD
export const actualizarSaldoUsuario = async (idUsuario, nuevoSaldo) => {
    console.log("API: actualizarSaldoUsuario", idUsuario, nuevoSaldo);
    const res = await fetch(`${AUTH_URL}/usuario/${idUsuario}/actualizar-saldo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ saldo: nuevoSaldo })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al actualizar saldo");
    console.log("API: saldo actualizado", data);
    return data;
};

// ===== JUEGOS =====

// Iniciar partida
export const iniciarJuego = async (idUsuario, jugadorId, tipoJuego, saldoInicial = 1000, apuesta = 50) => {
    console.log("API: iniciarJuego", idUsuario, jugadorId, tipoJuego, saldoInicial, apuesta);
    const res = await fetch(`${API_URL}/iniciar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idUsuario, jugadorId, tipoJuego, saldoInicial, apuesta })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al iniciar juego");
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
    if (!res.ok) throw new Error(data.error || "Error al ejecutar jugada");
    console.log("API: enviarJugada respuesta", data);
    return data;
};

// Obtener estado actual del juego
export const obtenerEstado = async (jugadorId, tipoJuego) => {
    const res = await fetch(
        `${API_URL}/estado?jugadorId=${jugadorId}&tipoJuego=${tipoJuego}`
    );
    if (!res.ok) throw new Error("Error al obtener estado");
    return res.json();
};

// Finalizar juego (para poder iniciar uno nuevo)
export const finalizarJuego = async (jugadorId, tipoJuego, ganancia = 0) => {
    console.log("API: finalizarJuego", jugadorId, tipoJuego, ganancia);
    const res = await fetch(
        `${API_URL}/finalizar?jugadorId=${jugadorId}&tipoJuego=${tipoJuego}&ganancia=${ganancia}`,
        { method: "POST" }
    );
    if (res.ok) {
        console.log("API: finalizarJuego OK");
        return { status: "OK" };
    }
    return { status: "ERROR" };
};