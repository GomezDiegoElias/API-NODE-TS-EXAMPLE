# API Node.js TypeScript Example

## Endpoints

### Health Check
- **GET** `/health` - Verificar el estado del servidor

### Root
- **GET** `/` - Información de la API

### Users

#### Register User
- **POST** `/api/users/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER"
}
```

#### Login User
- **POST** `/api/users/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get All Users
- **GET** `/api/users`
- **Headers:** `Authorization: Bearer <token>` (opcional)

#### Get User by ID
- **GET** `/api/users/:id`
- **Headers:** `Authorization: Bearer <token>` (opcional)

## Ejemplos de uso con curl

### Registrar usuario
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "USER"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Obtener todos los usuarios
```bash
curl -X GET http://localhost:3000/api/users
```

### Obtener usuario por ID
```bash
curl -X GET http://localhost:3000/api/users/1
```

### Health check
```bash
curl -X GET http://localhost:3000/health
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_here

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=api_node_ts_example
```

## Configuración de la Base de Datos

1. **Instalar MySQL** (si no lo tienes instalado)
2. **Crear la base de datos**:
   ```sql
   CREATE DATABASE api_node_ts_example;
   ```
3. **Configurar las credenciales** en el archivo `.env`
4. **Ejecutar la aplicación** - TypeORM creará automáticamente las tablas

## Ejecutar el servidor

```bash
# Desarrollo (con Bun)
bun run dev

# O con Node.js
node index.js
```

El servidor estará disponible en `http://localhost:3000` 