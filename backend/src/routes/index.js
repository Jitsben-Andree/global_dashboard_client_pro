import { Router } from 'express';

// --- IMPORTACIÓN DE RUTAS ---
import authRoutes from './auth.routes.js';
import countryRoutes from './country.routes.js';
import weatherRoutes from './weather.routes.js';
import provinceRoutes from './province.routes.js';
import newsRoutes from './news.routes.js'; // 1. IMPORTAR RUTAS DE NOTICIAS

const router = Router();

// --- DEFINICIÓN DE ENDPOINTS ---
router.use('/auth', authRoutes);
router.use('/countries', countryRoutes);
router.use('/weather', weatherRoutes);
router.use('/provinces', provinceRoutes);

// 2. ACTIVAR LA RUTA
router.use('/news', newsRoutes); 

// router.use('/favorites', favoritesRoutes);

export default router;