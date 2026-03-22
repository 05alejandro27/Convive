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

Edita el archivo `.env.example` con los siguientes valores:
```
DB_NAME=convive
DB_USER=convive_user
DB_PASSWORD=convive_pass
DB_PORT=5433
```

Después renómbralo a `.env`.

### 3. Levantar la base de datos

Desde la carpeta `/convive`:
```bash
docker compose up -d
```

Para comprobar que funciona:
```bash
docker ps
```

### 4. Arrancar el backend

Desde tu IDE o desde la carpeta `/convive/backend`:
```bash
mvn spring-boot:run
```

### 5. Arrancar el frontend

Desde tu IDE o desde la carpeta `/convive/frontend`:
```bash
npm install
npm run dev
```

### 6. Abrir la aplicación web

Accede desde tu navegador a **http://localhost:5173**

### 7. Datos de prueba

| Planta | Puerta | Contraseña |
|--------|--------|------------|
| 1      | A      | password123 |

### 8. Borrar la base de datos

Desde la carpeta `/convive`:
```bash
docker compose down -v
```

## Autor

Alejandro Peña Fernández — DAW 2026
