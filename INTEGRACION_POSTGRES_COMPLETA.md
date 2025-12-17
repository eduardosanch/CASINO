# ✅ Integración PostgreSQL + JPA - Completada

## 📊 Resumen de Cambios

Tu base de datos ha sido completamente integrada en el proyecto siguiendo tu estructura normalizada.

### 🗂️ Backend (Spring Boot + JPA)

#### **Entidades Creadas:**
- `UsuarioEntity` - Tabla `usuario`
- `JuegoEntity` - Tabla `juego`
- `PartidaEntity` - Tabla `partida`
- `PartidaJugadorEntity` - Tabla `partida_jugador`

#### **Repositorios Creados:**
- `UsuarioRepository` - Operaciones CRUD usuarios
- `JuegoRepository` - Operaciones CRUD juegos
- `PartidaRepository` - Operaciones CRUD partidas
- `PartidaJugadorRepository` - Operaciones CRUD partidas-jugadores

#### **Servicios:**
- `UsuarioService` - Gestión de usuarios:
  - `obtenerUsuario(Integer idUsuario)`
  - `obtenerPorCorreo(String correo)`
  - `crearUsuario(String nombre, String correo, BigDecimal fondos)`
  - `restarApuesta(Integer idUsuario, BigDecimal apuesta)`
  - `agregarGanancia(Integer idUsuario, BigDecimal ganancia)`

#### **Controladores:**
- `AuthController` - Endpoints de autenticación:
  - `POST /api/auth/registro` - Registrar usuario
  - `POST /api/auth/login` - Login (por correo)
  - `GET /api/auth/usuario/{id}` - Obtener datos del usuario

#### **DTOs Actualizados:**
- `RegistroRequest` - nombre, correo
- `LoginRequest` - correo
- `IniciarRequest` - idUsuario, jugadorId, tipoJuego, saldoInicial, apuesta

#### **Cambios en Controladores Existentes:**
- `JuegoController` - Ahora valida usuario en BD y gestiona fondos

#### **Configuración:**
- `pom.xml` - Agregadas dependencias JPA y PostgreSQL
- `application.properties` - Configuración BD PostgreSQL

---

### 💾 Base de Datos (PostgreSQL)

**Script SQL actualizado:** `/Users/eduardo_fsanchez/CASINO/CasinoWeb/BD/casino_database.sql`

**Tablas:**
- `usuario` - Usuarios del casino
- `juego` - Tipos de juegos disponibles
- `partida` - Historial de partidas
- `partida_jugador` - Relación partida-usuario
- `blackjack`, `poker`, `baccarat`, `solitario` - Detalles por juego
- `estadisticas` - Estadísticas por usuario
- `historial_apuestas` - Historial de apuestas

**Usuarios de Prueba:**
- player1@casino.com - $5000
- player2@casino.com - $3500
- admin@casino.com - $10000
- bot@casino.com (BOT) - $50000

---

### 🎨 Frontend (React + Vite)

#### **API (casinoApi.js) - Nuevas funciones:**
- `registrarUsuario(nombre, correo)` - Crear cuenta
- `loginUsuario(correo)` - Iniciar sesión
- `obtenerDatosUsuario(idUsuario)` - Obtener perfil

#### **API - Funciones actualizadas:**
- `iniciarJuego(idUsuario, jugadorId, tipoJuego, saldoInicial, apuesta)`

#### **Hooks (useCasinoGame.js):**
- Ahora recibe `idUsuario` como primer parámetro

#### **Componentes:**
- `BlackjackPage` - Ahora recibe `idUsuario` como prop

---

## 🚀 Instalación y Ejecución

### 1️⃣ Crear la Base de Datos

```bash
# Opción: Usar el script SQL
psql -U postgres -f /Users/eduardo_fsanchez/CASINO/CasinoWeb/BD/casino_database.sql

# O paso a paso:
psql -U postgres
CREATE DATABASE casino_db;
\c casino_db
# (pegar contenido del script)
```

### 2️⃣ Compilar Backend

```bash
cd /Users/eduardo_fsanchez/CASINO/CasinoWeb/Backend
mvn clean install -DskipTests
```

### 3️⃣ Ejecutar Backend

```bash
java -jar target/casino-backend-1.0.0.jar
```

Disponible en: `http://localhost:8080`

### 4️⃣ Ejecutar Frontend

```bash
cd /Users/eduardo_fsanchez/CASINO/CasinoWeb/Frontend
npm install
npm run dev
```

Disponible en: `http://localhost:5173`

---

## 🧪 Endpoints de Prueba

### Autenticación

**Registrar usuario:**
```bash
curl -X POST http://localhost:8080/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{ "nombre": "Juan", "correo": "juan@casino.com" }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "correo": "player1@casino.com" }'
```

**Obtener usuario:**
```bash
curl http://localhost:8080/api/auth/usuario/1
```

### Juegos

**Iniciar partida:**
```bash
curl -X POST http://localhost:8080/api/juego/iniciar \
  -H "Content-Type: application/json" \
  -d '{
    "idUsuario": 1,
    "jugadorId": "PLAYER1",
    "tipoJuego": "BLACKJACK",
    "saldoInicial": 1000,
    "apuesta": 50
  }'
```

---

## 📝 Notas Importantes

✅ **BD completa:** Todas las tablas están creadas y optimizadas con índices

✅ **Usuarios de prueba:** Listos para usar

✅ **Transacciones:** JPA automáticamente gestiona las transacciones

✅ **Relaciones:** Todas las relaciones foráneas están configuradas

✅ **BigDecimal:** Usados para fondos y apuestas (precisión financiera)

---

## 🔧 Configuración PostgreSQL (application.properties)

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/casino_db
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

**⚠️ Cambiar credenciales en producción**

---

## 📚 Próximos Pasos Recomendados

1. ✅ Crear página de Login/Registro en Frontend
2. ✅ Implementar Context para usuario autenticado
3. ✅ Guardar token en localStorage
4. ✅ Agregar hashing de contraseñas (BCrypt)
5. ✅ Implementar JWT
6. ✅ Crear página de Perfil
7. ✅ Mostrar saldo y historial

---

¡Sistema completamente integrado con PostgreSQL! 🎉
