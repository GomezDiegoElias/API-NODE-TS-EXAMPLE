import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware básico
app.use(cors());
app.use(express.json());

// Ruta simple de prueba
app.get('/test', (req, res) => {
  res.json({ message: 'Test server working!' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/test`);
}); 