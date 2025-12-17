import React, { useState } from "react";

export default function AgregarFondosModal({ usuario, onAgregarFondos, onCerrar }) {
    const [monto, setMonto] = useState(100);
    const [metodo, setMetodo] = useState("tarjeta");
    const [cargando, setCargando] = useState(false);

    const montosPredefinidos = [50, 100, 250, 500, 1000];

    const handleAgregarFondos = async () => {
        if (monto <= 0) {
            alert("El monto debe ser mayor a 0");
            return;
        }

        setCargando(true);
        try {
            // Simular procesamiento de pago
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Llamar a la función de callback
            onAgregarFondos(monto);
            setMonto(100);
            setMetodo("tarjeta");
        } catch (error) {
            console.error("Error al agregar fondos:", error);
            alert("Error al procesar la transacción");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        }}>
            <div style={{
                background: "#1a472a",
                padding: "40px",
                borderRadius: "15px",
                border: "2px solid #d4af37",
                maxWidth: "500px",
                width: "90%",
                color: "#fff"
            }}>
                <h2 style={{ 
                    color: "#d4af37", 
                    marginTop: 0,
                    textAlign: "center",
                    fontSize: "24px"
                }}>
                    💰 Agregar Fondos
                </h2>

                <p style={{ 
                    textAlign: "center", 
                    color: "#aaa",
                    marginBottom: "20px"
                }}>
                    Saldo actual: <span style={{ color: "#d4af37", fontSize: "18px", fontWeight: "bold" }}>
                        ${usuario?.fondos?.toFixed(2) || "0.00"}
                    </span>
                </p>

                {/* Montos predefinidos */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "10px",
                    marginBottom: "20px"
                }}>
                    {montosPredefinidos.map(valor => (
                        <button
                            key={valor}
                            onClick={() => setMonto(valor)}
                            style={{
                                padding: "12px",
                                fontSize: "14px",
                                background: monto === valor ? "#d4af37" : "#2e7d32",
                                color: monto === valor ? "#000" : "#fff",
                                border: `2px solid ${monto === valor ? "#fff" : "#d4af37"}`,
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                transition: "all 0.3s ease"
                            }}
                        >
                            ${valor}
                        </button>
                    ))}
                </div>

                {/* Entrada de monto personalizado */}
                <div style={{ marginBottom: "20px" }}>
                    <label style={{ 
                        display: "block", 
                        marginBottom: "8px",
                        color: "#d4af37",
                        fontWeight: "bold"
                    }}>
                        O ingresa un monto personalizado:
                    </label>
                    <input
                        type="number"
                        min="1"
                        step="10"
                        value={monto}
                        onChange={(e) => setMonto(Math.max(1, parseInt(e.target.value) || 1))}
                        style={{
                            width: "100%",
                            padding: "12px",
                            fontSize: "16px",
                            borderRadius: "6px",
                            border: "2px solid #d4af37",
                            boxSizing: "border-box",
                            background: "#1a472a",
                            color: "#d4af37",
                            textAlign: "center"
                        }}
                    />
                </div>

                {/* Método de pago */}
                <div style={{ marginBottom: "25px" }}>
                    <label style={{ 
                        display: "block", 
                        marginBottom: "10px",
                        color: "#d4af37",
                        fontWeight: "bold"
                    }}>
                        Método de pago:
                    </label>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px"
                    }}>
                        {[
                            { id: "tarjeta", nombre: "💳 Tarjeta de Crédito" },
                            { id: "transferencia", nombre: "🏦 Transferencia" },
                            { id: "paypal", nombre: "🌐 PayPal" },
                            { id: "criptomoneda", nombre: "₿ Criptomoneda" }
                        ].map(met => (
                            <button
                                key={met.id}
                                onClick={() => setMetodo(met.id)}
                                style={{
                                    padding: "10px",
                                    fontSize: "14px",
                                    background: metodo === met.id ? "#d4af37" : "#2e7d32",
                                    color: metodo === met.id ? "#000" : "#fff",
                                    border: `2px solid ${metodo === met.id ? "#fff" : "#d4af37"}`,
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                {met.nombre}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Resumen */}
                <div style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    padding: "15px",
                    borderRadius: "6px",
                    marginBottom: "25px",
                    borderLeft: "4px solid #d4af37"
                }}>
                    <p style={{ margin: "5px 0", fontSize: "14px" }}>
                        Monto a agregar: <span style={{ color: "#d4af37", fontWeight: "bold" }}>
                            ${monto.toFixed(2)}
                        </span>
                    </p>
                    <p style={{ margin: "5px 0", fontSize: "14px" }}>
                        Nuevo saldo: <span style={{ color: "#d4af37", fontWeight: "bold" }}>
                            ${((usuario?.fondos || 0) + monto).toFixed(2)}
                        </span>
                    </p>
                </div>

                {/* Botones */}
                <div style={{
                    display: "flex",
                    gap: "10px"
                }}>
                    <button
                        onClick={handleAgregarFondos}
                        disabled={cargando}
                        style={{
                            flex: 1,
                            padding: "14px",
                            fontSize: "16px",
                            background: "#d4af37",
                            color: "#000",
                            border: "none",
                            borderRadius: "6px",
                            cursor: cargando ? "not-allowed" : "pointer",
                            fontWeight: "bold",
                            opacity: cargando ? 0.6 : 1,
                            transition: "opacity 0.3s"
                        }}
                    >
                        {cargando ? "Procesando..." : "✓ Confirmar"}
                    </button>
                    <button
                        onClick={onCerrar}
                        disabled={cargando}
                        style={{
                            flex: 1,
                            padding: "14px",
                            fontSize: "16px",
                            background: "#555",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            cursor: cargando ? "not-allowed" : "pointer",
                            fontWeight: "bold",
                            opacity: cargando ? 0.6 : 1,
                            transition: "opacity 0.3s"
                        }}
                    >
                        ✕ Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
