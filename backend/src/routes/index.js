import { Router } from 'express';


import authRoutes from './auth.routes.js';
import countryRoutes from './country.routes.js';
import weatherRoutes from './weather.routes.js';
import provinceRoutes from './province.routes.js';
import newsRoutes from './news.routes.js'; 

const router = Router();


router.use('/auth', authRoutes);
router.use('/countries', countryRoutes);
router.use('/weather', weatherRoutes);
router.use('/provinces', provinceRoutes);

router.use('/news', newsRoutes); 

// router.use('/favorites', favoritesRoutes);

export default router;