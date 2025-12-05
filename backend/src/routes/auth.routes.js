import { Router } from 'express';
// Asegúrate de importar tu controlador real
import { register, login, logout, verifyToken } from '../controllers/auth.controller.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();


// POST /api/auth/register
router.post('/register', validateSchema(registerSchema), register);

// POST /api/auth/login
router.post('/login', validateSchema(loginSchema), login);

// POST /api/auth/logout
router.post('/logout', logout);

// GET /api/auth/verify
router.get('/verify', verifyToken);

export default router;