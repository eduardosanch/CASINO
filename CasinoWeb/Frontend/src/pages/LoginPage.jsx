import React, { useState } from "react";
import { loginUsuario, registrarUsuario } from "../api/casinoApi";

export default function LoginPage({ onLoginSuccess }) {
    const [modo, setModo] = useState("login"); // "login" o "registro"
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setCargando(true);

        try {
            if (!correo.trim()) {
                setError("Por favor ingresa tu email");
                setCargando(false);
                return;
            }
            if (!contraseña.trim()) {
                setError("Por favor ingresa tu contraseña");
                setCargando(false);
                return;
            }

            const usuario = await loginUsuario(correo, contraseña);
            console.log("Login exitoso:", usuario);
            onLoginSuccess(usuario);
        } catch (err) {
            setError(err.message || "Error al iniciar sesión");
            console.error("Error de login:", err);
        } finally {
            setCargando(false);
        }
    };

    const handleRegistro = async (e) => {
        e.preventDefault();
        setError("");
        setCargando(true);

        try {
            if (!nombre.trim()) {
                setError("Por favor ingresa tu nombre");
                setCargando(false);
                return;
            }
            if (!correo.trim()) {
                setError("Por favor ingresa tu email");
                setCargando(false);
                return;
            }
            if (!contraseña.trim()) {
                setError("Por favor ingresa una contraseña");
                setCargando(false);
                return;
            }
            if (contraseña !== confirmarContraseña) {
                setError("Las contraseñas no coinciden");
                setCargando(false);
                return;
            }
            if (contraseña.length < 6) {
                setError("La contraseña debe tener al menos 6 caracteres");
                setCargando(false);
                return;
            }

            const usuario = await registrarUsuario(nombre, correo, contraseña);
            console.log("Registro exitoso:", usuario);
            // Auto-login después del registro
            onLoginSuccess(usuario);
        } catch (err) {
            setError(err.message || "Error al registrar");
            console.error("Error de registro:", err);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div style={{ 
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #1a1a2e 0%, #0d5c36 100%)",
            padding: "20px"
        }}>
            <div style={{
                background: "rgba(30, 30, 50, 0.95)",
                border: "3px solid #d4af37",
                borderRadius: "20px",
                padding: "40px",
                maxWidth: "450px",
                width: "100%",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)"
            }}>
                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <h1 style={{
                        color: "#d4af37",
                        fontSize: "2.5rem",
                        margin: "0 0 10px 0",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                    }}>
                        🎰 CASINO ROA 🎰
                    </h1>
                    <p style={{ color: "#aaa", margin: 0 }}>Bienvenido al mejor casino online</p>
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", marginBottom: "30px", gap: "10px" }}>
                    <button
                        onClick={() => {
                            setModo("login");
                            setError("");
                            setNombre("");
                            setCorreo("");
                        }}
                        style={{
                            flex: 1,
                            padding: "12px",
                            border: "none",
                            borderRadius: "10px",
                            background: modo === "login" ? "#d4af37" : "#444",
                            color: modo === "login" ? "#000" : "#fff",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            cursor: "pointer",
                            transition: "all 0.3s"
                        }}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        onClick={() => {
                            setModo("registro");
                            setError("");
                            setNombre("");
                            setCorreo("");
                        }}
                        style={{
                            flex: 1,
                            padding: "12px",
                            border: "none",
                            borderRadius: "10px",
                            background: modo === "registro" ? "#d4af37" : "#444",
                            color: modo === "registro" ? "#000" : "#fff",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            cursor: "pointer",
                            transition: "all 0.3s"
                        }}
                    >
                        Registrarse
                    </button>
                </div>

                {/* Formulario */}
                <form onSubmit={modo === "login" ? handleLogin : handleRegistro}>
                    {modo === "registro" && (
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ 
                                display: "block", 
                                color: "#d4af37", 
                                marginBottom: "8px",
                                fontWeight: "bold"
                            }}>
                                Nombre de Usuario
                            </label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Tu nombre completo"
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    border: "2px solid #d4af37",
                                    borderRadius: "8px",
                                    fontSize: "1rem",
                                    background: "#222",
                                    color: "#fff",
                                    boxSizing: "border-box",
                                    transition: "border-color 0.3s"
                                }}
                                onFocus={(e) => e.target.style.borderColor = "#fff"}
                                onBlur={(e) => e.target.style.borderColor = "#d4af37"}
                            />
                        </div>
                    )}

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ 
                            display: "block", 
                            color: "#d4af37", 
                            marginBottom: "8px",
                            fontWeight: "bold"
                        }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder="tu@email.com"
                            style={{
                                width: "100%",
                                padding: "12px",
                                border: "2px solid #d4af37",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                background: "#222",
                                color: "#fff",
                                boxSizing: "border-box",
                                transition: "border-color 0.3s"
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#fff"}
                            onBlur={(e) => e.target.style.borderColor = "#d4af37"}
                        />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ 
                            display: "block", 
                            color: "#d4af37", 
                            marginBottom: "8px",
                            fontWeight: "bold"
                        }}>
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            placeholder="Tu contraseña"
                            style={{
                                width: "100%",
                                padding: "12px",
                                border: "2px solid #d4af37",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                background: "#222",
                                color: "#fff",
                                boxSizing: "border-box",
                                transition: "border-color 0.3s"
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#fff"}
                            onBlur={(e) => e.target.style.borderColor = "#d4af37"}
                        />
                    </div>

                    {modo === "registro" && (
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ 
                                display: "block", 
                                color: "#d4af37", 
                                marginBottom: "8px",
                                fontWeight: "bold"
                            }}>
                                Confirmar Contraseña
                            </label>
                            <input
                                type="password"
                                value={confirmarContraseña}
                                onChange={(e) => setConfirmarContraseña(e.target.value)}
                                placeholder="Confirma tu contraseña"
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    border: "2px solid #d4af37",
                                    borderRadius: "8px",
                                    fontSize: "1rem",
                                    background: "#222",
                                    color: "#fff",
                                    boxSizing: "border-box",
                                    transition: "border-color 0.3s"
                                }}
                                onFocus={(e) => e.target.style.borderColor = "#fff"}
                                onBlur={(e) => e.target.style.borderColor = "#d4af37"}
                            />
                        </div>
                    )}

                    {/* Mensaje de Error */}
                    {error && (
                        <div style={{
                            marginBottom: "20px",
                            padding: "12px",
                            background: "#8b0000",
                            color: "#fff",
                            borderRadius: "8px",
                            fontSize: "0.9rem"
                        }}>
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Botón Submit */}
                    <button
                        type="submit"
                        disabled={cargando}
                        style={{
                            width: "100%",
                            padding: "12px",
                            background: cargando ? "#999" : "#d4af37",
                            color: "#000",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            cursor: cargando ? "not-allowed" : "pointer",
                            transition: "all 0.3s"
                        }}
                        onMouseEnter={(e) => {
                            if (!cargando) e.target.style.transform = "scale(1.02)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = "scale(1)";
                        }}
                    >
                        {cargando ? "Cargando..." : (modo === "login" ? "Iniciar Sesión" : "Crear Cuenta")}
                    </button>
                </form>

                {/* Info Footer */}
                <div style={{
                    marginTop: "30px",
                    padding: "20px",
                    background: "rgba(0,0,0,0.3)",
                    borderRadius: "10px",
                    color: "#aaa",
                    fontSize: "0.85rem",
                    lineHeight: "1.6"
                }}>
                    <p style={{ margin: "0 0 10px 0" }}>
                        <strong>👤 Usuarios de Prueba:</strong>
                    </p>
                    <ul style={{ margin: "0", paddingLeft: "20px" }}>
                        <li><strong>player1@casino.com</strong> / Contraseña: player123</li>
                        <li><strong>player2@casino.com</strong> / Contraseña: player123</li>
                        <li><strong>admin@casino.com</strong> / Contraseña: admin123</li>
                    </ul>
                    <p style={{ margin: "15px 0 0 0", fontSize: "0.8rem", color: "#999" }}>
                        💡 O crea una nueva cuenta con el formulario de registro
                    </p>
                </div>
            </div>
        </div>
    );
}
