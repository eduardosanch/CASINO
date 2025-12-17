# 🎰 Resumen: Integración PostgreSQL + JPA + Spring Data

## ✅ Lo que se implementó

### 1. **Backend (Java Spring Boot)**

#### 📦 Dependencias Agregadas
- `spring-boot-starter-data-jpa` - ORM con Hibernate
- `postgresql` - Driver PostgreSQL

#### 🗂️ Archivos Creados/Modificados

**Entidades (Entity):**
- `UsuarioEntity.java` - Tabla `usuarios` con campos: username, email, password, saldo, fechaRegistro, etc.

**Repositorios (Repository):**
- `UsuarioRepository.java` - Interface JPA para operaciones CRUD en usuarios
  - `findByUsername()` - Buscar por username
  - `findByEmail()` - Buscar por email
  - `findByUsernameAndPassword()` - Login

**Servicios (Service):**
- `UsuarioService.java` - Lógica de negocio
  - `registrarUsuario()` - Crear nuevo usuario
  - `login()` - Autenticar usuario
  - `obtenerUsuario()` - Obtener datos por ID
  - `restarApuesta()` - Descontar apuesta del saldo
  - `agregarGanancia()` - Sumar ganancias

**Controladores (Controller):**
- `AuthController.java` - Endpoints de autenticación
  - `POST /api/auth/registro` - Registrar usuario
  - `POST /api/auth/login` - Login
  - `GET /api/auth/usuario/{id}` - Obtener datos del usuario

**DTOs:**
- `LoginRequest.java` - DTO para login
- `RegistroRequest.java` - DTO para registro

**Configuración:**
- `pom.xml` - Agregadas dependencias de JPA y PostgreSQL
- `application.properties` - Configuración de conexión a BD

#### 🔄 Archivos Modificados
- `JuegoController.java` - Ahora valida usuario y gestiona saldo
- `IniciarRequest.java` - Agregado campo `usuarioId`
- `JuegoService.java` - Ahora acepta parámetro `apuesta`

---

### 2. **Base de Datos (PostgreSQL)**

#### 📋 Tablas Creadas
- `usuarios` - Almacena usuarios del casino
- `partidas` - Historial de partidas jugadas
- `historial_apuestas` - Detalle de todas las apuestas
- `estadisticas` - Estadísticas por usuario
- `blackjack`, `ruleta`, `poker`, `baccarat`, `solitario` - Detalles por juego

#### 📊 Script SQL
- `casino_database.sql` - Script completo para crear BD
  - Incluye 3 usuarios de prueba (player1, player2, admin)
  - Índices para optimizar queries
  - Vista materializada para estadísticas

---

### 3. **Frontend (React + Vite)**

#### 📡 API Functions (casinoApi.js)

**Nuevas funciones de autenticación:**
- `registrarUsuario(username, email, password)` - Crear cuenta
- `loginUsuario(username, password)` - Iniciar sesión
- `obtenerDatosUsuario(usuarioId)` - Obtener perfil

**Funciones actualizadas:**
- `iniciarJuego(usuarioId, jugadorId, tipoJuego, saldoInicial, apuesta)` - Ahora requiere usuarioId

---

## 🚀 Pasos para Ejecutar

### 1. Crear la BD
```bash
# Opción 1: Usar el script
psql -U postgres -f /Users/eduardo_fsanchez/CASINO/CasinoWeb/BD/casino_database.sql

# Opción 2: Paso a paso
psql -U postgres
CREATE DATABASE casino_db;
\c casino_db
\i /path/to/casino_database.sql
```

### 2. Compilar Backend
```bash
cd /Users/eduardo_fsanchez/CASINO/CasinoWeb/Backend
mvn clean install -DskipTests
```

### 3. Ejecutar Backend
```bash
java -jar target/casino-backend-1.0.0.jar
```
Puerto: `http://localhost:8080`

### 4. Ejecutar Frontend
```bash
cd /Users/eduardo_fsanchez/CASINO/CasinoWeb/Frontend
npm install
npm run dev
```
Puerto: `http://localhost:5173`

---

## 🧪 Endpoints Disponibles

### Autenticación
```bash
# Registrar
POST /api/auth/registro
{ "username": "user", "email": "user@email.com", "password": "pass" }

# Login
POST /api/auth/login
{ "username": "user", "password": "pass" }

# Obtener usuario
GET /api/auth/usuario/1
```

### Juegos
```bash
# Iniciar partida
POST /api/juego/iniciar
{ "usuarioId": 1, "jugadorId": "PLAYER1", "tipoJuego": "BLACKJACK", "saldoInicial": 1000, "apuesta": 50 }

# Ejecutar jugada
POST /api/juego/jugada
{ "jugadorId": "PLAYER1", "tipoJuego": "BLACKJACK", "parametros": { "accion": "PEDIR" } }

# Obtener estado
GET /api/juego/estado?jugadorId=PLAYER1&tipoJuego=BLACKJACK

# Finalizar
POST /api/juego/finalizar?jugadorId=PLAYER1&tipoJuego=BLACKJACK&ganancia=100
```

---

## 📊 Usuarios de Prueba

| Username | Email | Password | Saldo |
|----------|-------|----------|-------|
| player1 | player1@casino.com | password123 | $5000 |
| player2 | player2@casino.com | password456 | $3500 |
| admin | admin@casino.com | admin123 | $10000 |

---

## 🔐 Notas de Seguridad

⚠️ **En Producción:**
- Cambiar credenciales por defecto en `application.properties`
- Implementar hashing de contraseñas (BCrypt)
- Agregar JWT para autenticación segura
- Usar variables de entorno para credenciales
- Implementar validación y sanitización de inputs

---

## 📚 Documentación Completa

Para más detalles, ver: `/Users/eduardo_fsanchez/CASINO/POSTGRESQL_SETUP.md`

---

## ✨ Próximos Pasos

1. ✅ Crear página de Login/Registro en Frontend
2. ✅ Implementar Context para manejar usuario autenticado
3. ✅ Guardar token en localStorage
4. ✅ Agregar persistencia de sesión
5. ✅ Crear página de Perfil del usuario
6. ✅ Mostrar saldo y historial de apuestas
7. ✅ Hashing de contraseñas (BCrypt)
8. ✅ JWT para autenticación segura

¡La integración con PostgreSQL está completa! 🎉
