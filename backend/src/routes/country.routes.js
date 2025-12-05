import { Router } from 'express';
import { getCountryDetails } from '../controllers/country.controller.js';

const router = Router();

// GET /api/countries/:code
// Acepta PE (2 letras) o PER (3 letras) gracias a tu arreglo en el controlador
router.get('/:code', getCountryDetails);

export default router;