import { Router } from 'express';
import { getCountryDetails } from '../controllers/country.controller.js';

const router = Router();

router.get('/:code', getCountryDetails);

export default router;