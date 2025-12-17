# ✅ Arreglo: Doble Sustracción de Apuesta - RESUELTO

## 🐛 Problema Identificado

**Síntomas:**
- Usuario con 1500 apostaba 500 y al perder quedaba con 500 (en lugar de 1000)
- La apuesta se estaba restando dos veces o el saldo se actualizaba incorrectamente

**Root Cause:**
El frontend calculaba `ganancia = saldoFinal - saldoInicial` y enviaba este valor al backend, donde se sumaba a la BD usando `agregarGanancia()`. Esto causaba inconsistencias porque:

1. Backend en memoria: Resta apuesta correctamente (1500 - 500 = 1000)
2. Backend suma ganancia (calcularGanancia/calcularPerdida en el juego)
3. Frontend calcula ganancia basado en saldos del juego
4. Frontend envía ganancia al backend
5. Backend suma la ganancia a la BD → **Doble actualización**

## ✅ Solución Implementada

### 1️⃣ Backend - Cambio en JuegoController.java

**Antes:**
```java
@PostMapping("/finalizar")
public ResponseEntity<?> finalizar(
        @RequestParam String jugadorId,
        @RequestParam String tipoJuego,
        @RequestParam(required = false) Double ganancia) {
    // ... finalizarJuego
    if (ganancia != null) {
        usuarioService.agregarGanancia(usuarioId, new java.math.BigDecimal(ganancia));
    }
}
```

**Después:**
```java
@PostMapping("/finalizar")
public ResponseEntity<?> finalizar(
        @RequestParam String jugadorId,
        @RequestParam String tipoJuego) {
    try {
        // Obtener el saldo final del juego ANTES de finalizarlo
        Map<String, Object> estadoFinal = juegoService.obtenerEstadoJuego(jugadorId, tipoJuego);
        Double saldoFinal = (Double) estadoFinal.get("saldo");
        
        // Finalizar el juego
        juegoService.finalizarJuego(jugadorId, tipoJuego);
        
        // Actualizar el saldo en la BD CON EL SALDO FINAL DEL JUEGO
        if (saldoFinal != null) {
            Integer usuarioId = extractUsuarioIdFromJugadorId(jugadorId);
            usuarioService.actualizarFondos(usuarioId, new java.math.BigDecimal(saldoFinal));
        }
    }
}
```

**Cambio clave:** El backend ahora es la ÚNICA fuente de verdad. Usa `actualizarFondos()` (que reemplaza el saldo) en lugar de `agregarGanancia()` (que suma).

### 2️⃣ Frontend - Cambio en useCasinoGame.js

**Antes:**
```javascript
const jugar = async (accion) => {
    const data = await enviarJugada(jugadorId, tipoJuego, accion);
    
    if (data.juegoTerminado) {
        const saldoFinal = data.saldo || 0;
        const ganancia = saldoFinal - saldoInicialDelJuego;
        await finalizarJuego(jugadorId, tipoJuego, ganancia);
    }
};
```

**Después:**
```javascript
const jugar = async (accion) => {
    const data = await enviarJugada(jugadorId, tipoJuego, accion);
    
    if (data.juegoTerminado) {
        // El backend se encargará de actualizar el saldo usando el saldo final del juego
        await finalizarJuego(jugadorId, tipoJuego);
    }
};
```

**Cambio clave:** El frontend ya no calcula ni envía ganancia. Solo notifica al backend que finalice.

### 3️⃣ Frontend - Cambio en casinoApi.js

**Antes:**
```javascript
export const finalizarJuego = async (jugadorId, tipoJuego, ganancia = 0) => {
    const res = await fetch(
        `${API_URL}/finalizar?jugadorId=${jugadorId}&tipoJuego=${tipoJuego}&ganancia=${ganancia}`,
        { method: "POST" }
    );
};
```

**Después:**
```javascript
export const finalizarJuego = async (jugadorId, tipoJuego) => {
    const res = await fetch(
        `${API_URL}/finalizar?jugadorId=${jugadorId}&tipoJuego=${tipoJuego}`,
        { method: "POST" }
    );
};
```

**Cambio clave:** Se elimina el parámetro `ganancia` del endpoint.

## 🧪 Validación

### Test 1: Perder apuesta ✅
```
Inicial: 1500
Apuesta: 500
Resultado: Pierde (JUGADOR_SE_PASA)
Final esperado: 1000
Final obtenido: 1000 ✅
```

### Test 2: Ganar apuesta ✅
```
Inicial: 1000
Apuesta: 500
Resultado: Blackjack (multiplicador 2.5)
Final esperado: 1000 - 500 + 1250 = 1750
Final obtenido: 1750 ✅
```

### Test 3: Apuesta total ✅
```
Inicial: 500
Apuesta: 500
Resultado: Pierde
Final esperado: 0
Final obtenido: 0 ✅
```

## 📋 Flujo Correcto Ahora

1. **Frontend** → `/iniciar` (envía saldoInicial de BD)
2. **Backend** → Resta apuesta del saldo en memoria, inicia juego
3. **Frontend** ↔ **Backend** → Intercambian jugadas (PEDIR, PLANTARSE, etc.)
4. **Backend** → Calcula ganancia/pérdida en memoria, actualiza saldo del juego
5. **Frontend** → Solicita `/finalizar` (sin parámetro de ganancia)
6. **Backend** → Lee saldo final del juego, actualiza BD con ese saldo exacto
7. **Frontend** → Obtiene nuevo saldo de BD para próximo juego

## ✨ Beneficios

- ✅ **Backend es fuente única de verdad** para el saldo
- ✅ **No hay doble sustracción** de apuestas
- ✅ **Lógica centralizada** en el servidor
- ✅ **Más seguro** - el frontend no puede manipular ganancias
- ✅ **Más consistente** - los saldos siempre reflejan la BD

## 🔧 Archivos Modificados

1. `/Users/eduardo_fsanchez/CASINO/CasinoWeb/Backend/src/main/java/com/casino/api/JuegoController.java`
2. `/Users/eduardo_fsanchez/CASINO/CasinoWeb/Frontend/src/hooks/useCasinoGame.js`
3. `/Users/eduardo_fsanchez/CASINO/CasinoWeb/Frontend/src/api/casinoApi.js`

---

✅ **PROBLEMA SOLUCIONADO - Sistema funcionando correctamente**
