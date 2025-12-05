import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// Esquema de validación para variables de entorno
// Esto garantiza que la app no arranque si falta algo crítico
const envSchema = z.object({
  PORT: z.string().default('8010'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string({ required_error: "DATABASE_URL es requerida" }),
  JWT_SECRET: z.string({ required_error: "JWT_SECRET es requerido" }),
  FRONTEND_URL: z.string().default('http://localhost:8011'),
  // Opcionales para servicios externos
  NEWSDATA_API_KEY: z.string().optional(),
  RAPIDAPI_KEY: z.string().optional(),
});

// Intentamos validar y exportar. Si falla, el servidor se detendrá y mostrará el error.
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Error en variables de entorno:", _env.error.format());
  process.exit(1);
}

export const envs = _env.data;