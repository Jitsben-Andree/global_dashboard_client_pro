const corsOptions = {
  // Permitimos solicitudes desde la URL del Frontend (configurada en .env)
  // Si no está definida, por defecto acepta localhost:8011
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:8011'];
    
    // Permitir solicitudes sin origen (como Postman o servidores backend-to-backend)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Permite recibir cookies (JWT)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

export default corsOptions;