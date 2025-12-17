# 📊 Guía de Configuración: PostgreSQL para Casino Backend

## 🔧 Requisitos Previos

1. **PostgreSQL instalado** (versión 12 o superior)
   - macOS: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql`
   - Windows: Descargar desde [postgresql.org](https://www.postgresql.org/download/windows/)

2. **PostgreSQL corriendo**
   - macOS/Linux: `brew services start postgresql` o `pg_ctl -D /usr/local/var/postgres start`
   - Windows: Debe estar corriendo como servicio

3. **Java 17+** y **Maven** instalados
4. **Node.js** para el frontend

---

## 📋 Pasos de Instalación

### 1️⃣ Crear la Base de Datos

**Opción A: Usando el script SQL (RECOMENDADO)**

```bash
# Abrir psql como usuario postgres
psql -U postgres

# Ejecutar el script
\i /Users/eduardo_fsanchez/CASINO/CasinoWeb/BD/casino_database.sql

# Salir
\q
```

**Opción B: Crear manualmente**

```bash
psql -U postgres

# En la terminal de psql:
CREATE DATABASE casino_db;
\c casino_db
# (Luego ejecutar el contenido del script)
```

### 2️⃣ Verificar la Conexión

```bash
# Conectarse a la BD
psql -U postgres -d casino_db

# Ver tablas creadas
\dt

# Ver usuarios de prueba
SELECT * FROM usuarios;

# Salir
\q
```

---

## 🔐 Configurar Credenciales (Opcional)

Si tu PostgreSQL tiene contraseña diferente, actualiza `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/casino_db
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
```

---

## ▶️ Ejecutar el Proyecto

### Backend (Spring Boot)

```bash
cd /Users/eduardo_fsanchez/CASINO/CasinoWeb/Backend

# Compilar
mvn clean install -DskipTests

# Ejecutar
java -jar target/casino-backend-1.0.0.jar
```

El servidor estará disponible en: **http://localhost:8080**

### Frontend (Vite + React)

```bash
cd /Users/eduardo_fsanchez/CASINO/CasinoWeb/Frontend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

---

## 🧪 Pruebas de API

### 1️⃣ Registrar Usuario

```bash
curl -X POST http://localhost:8080/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newplayer",
    "email": "newplayer@casino.com",
    "password": "password123"
  }'
```

**Respuesta esperada:**
```json
{
  "id": 4,
  "username": "newplayer",
  "email": "newplayer@casino.com",
  "saldo": 1000.0,
  "fechaRegistro": "2025-12-16T15:30:00",
  "activo": true
}
```

### 2️⃣ Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "player1",
    "password": "password123"
  }'
```

### 3️⃣ Obtener Datos del Usuario

```bash
curl -X GET http://localhost:8080/api/auth/usuario/1
```

### 4️⃣ Iniciar Partida (con apuesta)

```bash
curl -X POST http://localhost:8080/api/juego/iniciar \
  -H "Content-Type: application/json" \
  -d '{
    "usuarioId": 1,
    "jugadorId": "PLAYER1",
    "tipoJuego": "BLACKJACK",
    "saldoInicial": 1000,
    "apuesta": 50
  }'
```

---

## 🔍 Troubleshooting

### Error: "FATAL: role "postgres" does not exist"

```bash
# Crear el usuario postgres
createuser -s postgres
```

### Error: "Database already exists"

```bash
# Eliminar la BD anterior
psql -U postgres -c "DROP DATABASE IF EXISTS casino_db;"
```

### Error: "Connection refused"

1. Verificar que PostgreSQL está corriendo: `ps aux | grep postgres`
2. Reiniciar PostgreSQL:
   - macOS: `brew services restart postgresql`
   - Linux: `sudo systemctl restart postgresql`

### Error: "JPA no mapea las entidades"

Asegúrate de que `application.properties` tiene `spring.jpa.hibernate.ddl-auto=update`

---

## 📊 Usuarios de Prueba

La BD se crea con los siguientes usuarios:

| Username | Email | Password |
|----------|-------|----------|
| player1 | player1@casino.com | password123 |
| player2 | player2@casino.com | password456 |
| admin | admin@casino.com | admin123 |

Saldo inicial: $1000, $3500, $10000 respectivamente

---

## 🚀 Siguientes Pasos

1. ✅ Compilar Backend: `mvn clean install -DskipTests`
2. ✅ Ejecutar Backend: `java -jar target/casino-backend-1.0.0.jar`
3. ✅ Ejecutar Frontend: `npm run dev`
4. ✅ Probar endpoints con curl o Postman
5. ✅ Agregar interfaz de login en el Frontend

---

## 📝 Notas Importantes

- Las credenciales por defecto en `application.properties` son `postgres:postgres`
- Cambiar en producción
- Los DTOs actualizados incluyen `usuarioId` obligatorio
- El saldo se deduce automáticamente al iniciar una partida
- Las ganancias se agregan al finalizar

---

¡La configuración de PostgreSQL está completa! 🎉
