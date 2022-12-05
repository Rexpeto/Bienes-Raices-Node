import express from 'express';
import { admin, crear, guardar } from '../controllers/propiedadControllers.js';

const router = express.Router();

router.get('/mis-propiedades', admin);
router.get('/propiedad/crear', crear);
router.post('/propiedad/crear', guardar);

export default router;