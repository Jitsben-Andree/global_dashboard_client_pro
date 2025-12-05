import { Router } from 'express';
import { getProvinces } from '../controllers/province.controller.js';
import { authRequired } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authRequired, getProvinces);

export default router;