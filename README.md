# API-NODE-TS-EXAMPLE

Ejemplo de API REST con Node.js usando TypeScript siguiendo arquitectura hexagonal (Clean Architecture).

## 🚀 Características

- **TypeScript** - Tipado estático para mayor seguridad
- **Express.js** - Framework web para Node.js
- **Arquitectura Hexagonal** - Separación clara de responsabilidades
- **TypeORM** - ORM para MySQL con soporte completo
- **MySQL** - Base de datos relacional
- **JWT Authentication** - Autenticación con tokens
- **bcrypt** - Encriptación de contraseñas
- **CORS** - Soporte para peticiones cross-origin
- **Bun** - Runtime de JavaScript rápido

## 📁 Estructura del Proyecto

```
src/
├── shared/
│   ├── core/           # Entidades y puertos del dominio
│   ├── infrastructure/ # Configuración de dependencias
│   └── utils/          # Utilidades compartidas
└── user/
    ├── application/    # Casos de uso (servicios)
    ├── domain/         # Entidades y reglas de negocio
    └── infrastructure/ # Implementaciones (controladores, repositorios)
```

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd API-NODE-TS-EXAMPLE
```

2. **Instalar dependencias**
```bash
bun install
# o
npm install
```

3. **Configurar variables de entorno**
```bash
# Copiar el archivo de ejemplo
cp env.example .env

# Editar el archivo .env con tus credenciales de MySQL
PORT=3000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=api_node_ts_example
```

## 🏃‍♂️ Ejecutar el Servidor

### Desarrollo (con Bun)
```bash
bun run dev
```

### Producción
```bash
bun run build
bun run start
```

El servidor estará disponible en `http://localhost:3000`

## 📚 Endpoints Disponibles

### Health Check
- `GET /health` - Verificar estado del servidor

### Usuarios
- `POST /api/users/register` - Registrar nuevo usuario
- `POST /api/users/login` - Iniciar sesión
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID

## 🧪 Probar la API

### Usando el archivo HTTP
El proyecto incluye un archivo `index.http` con ejemplos de peticiones que puedes ejecutar directamente desde VS Code con la extensión "REST Client".

### Usando curl
```bash
# Registrar usuario
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "USER"
  }'

# Login
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## 🔧 Scripts Disponibles

- `bun run dev` - Ejecutar en modo desarrollo con hot reload
- `bun run build` - Compilar TypeScript
- `bun run lint` - Ejecutar ESLint

## 📖 Documentación

Ver `API_DOCUMENTATION.md` para documentación completa de la API.

## 🏗️ Arquitectura

Este proyecto sigue los principios de **Clean Architecture** (Arquitectura Hexagonal):

- **Domain Layer**: Contiene las entidades y reglas de negocio
- **Application Layer**: Contiene los casos de uso y servicios
- **Infrastructure Layer**: Contiene implementaciones concretas (APIs, bases de datos)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
