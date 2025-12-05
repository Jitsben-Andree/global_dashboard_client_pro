import { Router } from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favorites.controller.js';
import { authRequired } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authRequired, getFavorites);
router.post('/', authRequired, addFavorite);
router.delete('/:id', authRequired, removeFavorite);

export default router;