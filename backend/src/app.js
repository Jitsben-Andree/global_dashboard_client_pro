import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';

const app = express();

// 1. Middlewares Globales
app.use(express.json()); // Para entender JSON en el body
app.use(cookieParser()); // Para leer cookies (JWT)

// 2. Configuración de CORS
app.use(cors({
  // Permitimos 3 orígenes: Tu variable de entorno, el puerto docker interno, y tu frontend local
  origin: [
    process.env.FRONTEND_URL,   
    'http://localhost:8011',    
    'http://localhost:3000'     
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// 3. Rutas
// Definimos el prefijo maestro: /api
app.use('/api', routes);

// Ruta de prueba (Health Check)
app.get('/', (req, res) => {
  res.send('Global Info Dashboard API is Running 🚀 on Port ' + (process.env.PORT || 8010));
});

export default app;