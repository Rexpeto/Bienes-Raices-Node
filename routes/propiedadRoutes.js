import express from 'express';
import { body } from 'express-validator';
import { admin, crear, guardar } from '../controllers/propiedadControllers.js';

const router = express.Router();

router.get('/mis-propiedades', admin);
router.get('/propiedad/crear', crear);
router.post('/propiedad/crear',
    body('titulo').notEmpty().withMessage('El titulo del anuncio es obligatorio!!'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    body('categoria').isNumeric().withMessage('Seleccione una categoría'),
    body('precio').isNumeric().withMessage('Seleccione un precio'),
    body('wc').isNumeric().withMessage('Seleccione la cantidad de baños'),
    body('habitaciones').isNumeric().withMessage('Seleccione la cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Seleccione la cantidad de estacionamientos'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    guardar
);

export default router;