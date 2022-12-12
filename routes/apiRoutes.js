import express from 'express';
import { categoria ,propiedades } from '../controllers/apiControllers.js';

const router = express.Router();

router.get('/propiedades', propiedades);
router.get('/categorias', categoria);

export default router;