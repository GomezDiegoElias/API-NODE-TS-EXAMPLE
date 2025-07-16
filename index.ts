import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import config from './config.js';
import { createUserRoutes } from './src/user/infrastructure/user.routes.js';
import { userController } from './src/shared/infrastructure/dependency-injection.js';
import { initializeDatabase, closeDatabase } from './src/shared/infrastructure/database/typeorm.config.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const server = createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Node.js TypeScript Example',
    version: '1.0.0'
  });
});

// API routes
app.use('/api/users', createUserRoutes(userController));

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
const PORT = parseInt(config.port, 10);

async function startServer() {
  try {
    // Initialize database
    await initializeDatabase();
    
    // Start server
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🌐 API base URL: http://localhost:${PORT}`);
      console.log(`🗄️  Database: MySQL connected`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(async () => {
    await closeDatabase();
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(async () => {
    await closeDatabase();
    console.log('Process terminated');
    process.exit(0);
  });
});

export default app;

