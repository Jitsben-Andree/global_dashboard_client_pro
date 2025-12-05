import app from './app.js';
import prisma from './lib/prisma.js';
import dotenv from 'dotenv';

dotenv.config();

// Actualizado: Puerto por defecto 8010
const PORT = process.env.PORT || 8010;

const main = async () => {
  try {
    // Intentar conectar a la BD antes de iniciar
    await prisma.$connect();
    console.log(' Conexión a Base de Datos (PostgreSQL) exitosa');

    app.listen(PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

main();