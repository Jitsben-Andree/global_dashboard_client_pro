import { Router } from 'express';
import { getProvinces } from '../controllers/province.controller.js';
import { authRequired } from '../middlewares/auth.middleware.js';

const router = Router();

// Protegemos la ruta para que solo usuarios logueados vean provincias
router.get('/:countryCode', authRequired, getProvinces);

export default router;