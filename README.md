# Convive

Plataforma web para la gestión de comunidades de vecinos.

Permite a presidentes y vecinos gestionar presupuestos, gastos y votaciones de forma centralizada y segura.

## Stack

- **Frontend:** React
- **Backend:** Java + Spring Boot
- **Base de datos:** PostgreSQL

## Manual de uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/05alejandro27/convive.git
cd convive
```

### 2. Configurar variables de entorno

Crea el archivo `.env` con tus credenciales locales:
```
DB_NAME=DB_NAME
DB_USER=DB_USER
DB_PASSWORD=DB_PASSWORD
DB_PORT=5433
```

### 3. Levantar la base de datos

Desde la carpeta `/convive`:
```bash
docker compose up -d
```

Para comprobar que funciona:
```bash
docker ps
```

### 4. Configurar el backend

Crea el archivo `backend/src/main/resources/application-dev.properties` con el siguiente contenido:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5433/DB_NAME
spring.datasource.username=DB_USER
spring.datasource.password=DB_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
application.security.jwt.secret-key=TU_SECRET_KEY
application.security.jwt.expiration=86400000
app.cors.allowed-origins=http://localhost:5173
```

Para generar la secret key ejecuta:

```bash
openssl rand -hex 32
```

### 5. Arrancar el backend

Desde tu IDE con perfil dev o desde la carpeta `/backend`:
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### 6. Arrancar el frontend

Desde tu IDE o desde la carpeta `/frontend`:
```bash
npm install
npm run dev
```

### 7. Abrir la aplicación web

Accede desde tu navegador a **http://localhost:5173**

### 8. Datos de prueba

| Planta | Puerta | Contraseña |
|--------|--------|------------|
| 1      | A      | password123 |

### 9. Borrar la base de datos

Desde la carpeta `/convive`:
```bash
docker compose down -v
```

## Autor

Alejandro Peña Fernández — DAW 2026
