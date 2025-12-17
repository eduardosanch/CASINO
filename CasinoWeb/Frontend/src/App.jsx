import React, { useState, useEffect } from "react";
import BlackjackPage from "./pages/BlackjackPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import AgregarFondosModal from "./components/AgregarFondosModal";
import { obtenerDatosUsuario, actualizarSaldoUsuario } from "./api/casinoApi";

function App() {
    const [paginaActual, setPaginaActual] = useState("menu");
    const [usuarioActual, setUsuarioActual] = useState(null);
    const [mostrarModalFondos, setMostrarModalFondos] = useState(false);

    // Recuperar usuario del localStorage al montar
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            try {
                setUsuarioActual(JSON.parse(usuarioGuardado));
            } catch (e) {
                console.error("Error al recuperar usuario:", e);
            }
        }
    }, []);

    const handleLoginSuccess = (usuario) => {
        console.log("Login exitoso, usuario:", usuario);
        setUsuarioActual(usuario);
        localStorage.setItem("usuario", JSON.stringify(usuario));
        setPaginaActual("menu");
    };

    const handleLogout = () => {
        setUsuarioActual(null);
        localStorage.removeItem("usuario");
        setPaginaActual("menu");
    };

    // Refrescar datos del usuario
    const refrescarUsuario = async () => {
        if (usuarioActual?.idUsuario) {
            try {
                const usuarioActualizado = await obtenerDatosUsuario(usuarioActual.idUsuario);
                console.log("Usuario actualizado:", usuarioActualizado);
                setUsuarioActual(usuarioActualizado);
                localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));
            } catch (e) {
                console.error("Error al refrescar usuario:", e);
            }
        }
    };

    const handleAgregarFondos = async (monto) => {
        try {
            const nuevosSaldos = (usuarioActual?.fondos || 0) + monto;
            
            // Actualizar en la BD
            const usuarioActualizado = await actualizarSaldoUsuario(usuarioActual.idUsuario, nuevosSaldos);
            
            // Actualizar estado local
            setUsuarioActual(usuarioActualizado);
            localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));
            setMostrarModalFondos(false);
            alert(`✓ Se agregaron $${monto.toFixed(2)} a tu cuenta. Nuevo saldo: $${nuevosSaldos.toFixed(2)}`);
        } catch (error) {
            console.error("Error al agregar fondos:", error);
            alert("Error al agregar fondos. Por favor intenta de nuevo.");
        }
    };

    const renderPagina = () => {
        switch (paginaActual) {
            case "blackjack":
                return <BlackjackPage 
                    usuario={usuarioActual}
                    onVolverMenu={() => {
                        refrescarUsuario(); // Refrescar saldo al volver del juego
                        setPaginaActual("menu");
                    }}
                />;
            default:
                return <MenuPrincipal 
                    usuario={usuarioActual}
                    onSeleccionar={setPaginaActual}
                    onAgregarFondos={() => setMostrarModalFondos(true)}
                />;
        }
    };

    // Si no hay usuario, mostrar login
    if (!usuarioActual) {
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <div style={{ minHeight: "100vh", background: "#1a1a2e" }}>
            <Header usuario={usuarioActual} onLogout={handleLogout} />

            <main style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
                {renderPagina()}
            </main>

            {mostrarModalFondos && (
                <AgregarFondosModal
                    usuario={usuarioActual}
                    onAgregarFondos={handleAgregarFondos}
                    onCerrar={() => setMostrarModalFondos(false)}
                />
            )}
        </div>
    );
}

function MenuPrincipal({ usuario, onSeleccionar, onAgregarFondos }) {
    const juegos = [
        { id: "blackjack", nombre: "♠ Blackjack ♥", descripcion: "Intenta llegar a 21 sin pasarte", color: "#1a472a" },
        { id: "ruleta", nombre: "🎡 Ruleta", descripcion: "Próximamente...", color: "#8b0000", disabled: true },
        { id: "poker", nombre: "🃏 Poker", descripcion: "Próximamente...", color: "#1e3a5f", disabled: true },
    ];

    return (
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
            {/* Sección de Fondos */}
            <div style={{
                background: "rgba(255, 255, 255, 0.05)",
                padding: "20px",
                borderRadius: "10px",
                marginBottom: "40px",
                border: "2px solid #d4af37",
                maxWidth: "600px",
                margin: "0 auto 40px"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px"
                }}>
                    <div style={{ textAlign: "left" }}>
                        <p style={{ 
                            color: "#aaa", 
                            margin: "0 0 8px 0",
                            fontSize: "14px"
                        }}>
                            Tu saldo actual:
                        </p>
                        <h3 style={{ 
                            color: "#d4af37", 
                            margin: 0,
                            fontSize: "32px"
                        }}>
                            ${usuario?.fondos?.toFixed(2) || "0.00"}
                        </h3>
                    </div>
                    <button
                        onClick={onAgregarFondos}
                        style={{
                            padding: "12px 24px",
                            fontSize: "16px",
                            background: "#2e7d32",
                            color: "#d4af37",
                            border: "2px solid #d4af37",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            transition: "all 0.3s ease",
                            whiteSpace: "nowrap"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#3a9a3f";
                            e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#2e7d32";
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        💰 Agregar Fondos
                    </button>
                </div>
            </div>

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
