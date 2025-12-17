# 🔧 Referencia Rápida - Tests de Apuestas

## Endpoints Principales

### Autenticación
```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"correo": "player1@casino.com", "contraseña": "player1"}'

# Obtener datos usuario
curl http://localhost:8080/api/auth/usuario/1

# Actualizar saldo
curl -X POST http://localhost:8080/api/auth/usuario/1/actualizar-saldo \
  -H "Content-Type: application/json" \
  -d '{"saldo": 1500}'
```

### Juegos
```bash
# Iniciar juego
curl -X POST http://localhost:8080/api/juego/iniciar \
  -H "Content-Type: application/json" \
  -d '{
    "idUsuario": 1,
    "jugadorId": "PLAYER1",
    "tipoJuego": "BLACKJACK",
    "saldoInicial": 1500,
    "apuesta": 500
  }'

# Ejecutar jugada
curl -X POST http://localhost:8080/api/juego/jugada \
  -H "Content-Type: application/json" \
  -d '{
    "jugadorId": "PLAYER1",
    "tipoJuego": "BLACKJACK",
    "parametros": {"accion": "PEDIR"}
  }'

# Acciones: PEDIR, PLANTARSE, DOBLAR, RENDIRSE

# Obtener estado
curl "http://localhost:8080/api/juego/estado?jugadorId=PLAYER1&tipoJuego=BLACKJACK"

# Finalizar juego
curl -X POST "http://localhost:8080/api/juego/finalizar?jugadorId=PLAYER1&tipoJuego=BLACKJACK"
```

## Test Scripts Disponibles

### Test 1: Perder apuesta
```bash
/tmp/test_blackjack.sh
```
Simula: 500 inicial, apuesta 500, pierde → Esperado: 0

### Test 2: Ganar apuesta
```bash
/tmp/test_ganar.sh
```
Simula: 1000 inicial, apuesta 500, gana → Esperado: 1500+

### Test 3: Apuesta de 500 con 1500
```bash
/tmp/test_1500_500_pierde.sh
```
Simula: 1500 inicial, apuesta 500, pierde → Esperado: 1000

### Test Final (Completo)
```bash
/tmp/test_final.sh
```
Validación rápida de todos los casos

## Resultados Esperados por Escenario

### Ganar con multiplicador 2x
```
Saldo inicial: X
Apuesta: A
Saldo final = X - A + (A * 2) = X + A
```
Ejemplo: 1000 - 500 + 1000 = 1500

### Ganar con Blackjack (2.5x)
```
Saldo final = X - A + (A * 2.5) = X + 1.5A
```
Ejemplo: 1000 - 500 + 1250 = 1750

### Perder apuesta
```
Saldo final = X - A
```
Ejemplo: 1500 - 500 = 1000

### Empate (devolver apuesta)
```
Saldo final = X
```
Ejemplo: 1000 apostó 500, empate, sigue con 1000

### Rendirse (50%)
```
Saldo final = X - A + (A/2) = X - A/2
```
Ejemplo: 1000 - 500 + 250 = 750

## Verificación Rápida

### Verificar saldo actual
```bash
curl -s http://localhost:8080/api/auth/usuario/1 | jq '.fondos'
```

### Verificar estado del juego
```bash
curl -s "http://localhost:8080/api/juego/estado?jugadorId=PLAYER1&tipoJuego=BLACKJACK" | jq '.saldo, .juegoTerminado, .resultado'
```

## Estados del Juego

- `READY` - Listo para jugar
- `IN_PROGRESS` - Juego en progreso
- `FINISHED` - Juego terminado

## Resultados de Blackjack

- `EN_PROGRESO` - Juego en progreso
- `BLACKJACK_JUGADOR` - Jugador tiene 21 inicial (gana 2.5x)
- `BLACKJACK_DEALER` - Dealer tiene 21 inicial (jugador pierde)
- `JUGADOR_GANA` - Jugador tiene más puntos (gana 2x)
- `DEALER_GANA` - Dealer tiene más puntos (jugador pierde)
- `JUGADOR_SE_PASA` - Jugador se pasó de 21 (pierde)
- `DEALER_SE_PASA` - Dealer se pasó de 21 (jugador gana 2x)
- `EMPATE` - Mismo puntaje (se devuelve apuesta)
- `RENDICION` - Jugador se rindió (devuelve 50% de apuesta)

---

**Última actualización:** 16 de diciembre de 2025
