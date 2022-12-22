import express from 'express';
import { body } from 'express-validator';
import { actualizar, admin, agregarImagen, almacenarImagen, crear, editar, eliminar, enviarMensaje, guardar, mostrarPropiedad } from '../controllers/propiedadControllers.js';
import protegerRuta from '../middleware/protegerRuta.js';
import {idetinficarUsuario}  from '../middleware/identificarUsuario.js';
import upload from '../middleware/subirImagen.js';

const router = express.Router();

router.get('/mis-propiedades', protegerRuta, admin);
router.get('/propiedad/crear', protegerRuta, crear);
router.post('/propiedad/crear',
    body('titulo').notEmpty().withMessage('El titulo del anuncio es obligatorio!!'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    body('categoria').isNumeric().withMessage('Seleccione una categoría'),
    body('precio').isNumeric().withMessage('Seleccione un precio'),
    body('wc').isNumeric().withMessage('Seleccione la cantidad de baños'),
    body('habitaciones').isNumeric().withMessage('Seleccione la cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Seleccione la cantidad de estacionamientos'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    protegerRuta,
    guardar
);
router.get('/propiedades/agregar-imagen/:id', protegerRuta, agregarImagen);
router.post('/propiedades/agregar-imagen/:id', protegerRuta, upload.single('imagen'), almacenarImagen);

router.get('/propiedades/editar/:id', protegerRuta, editar);
router.post('/propiedades/editar/:id',
    body('titulo').notEmpty().withMessage('El titulo del anuncio es obligatorio!!'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
    body('categoria').isNumeric().withMessage('Seleccione una categoría'),
    body('precio').isNumeric().withMessage('Seleccione un precio'),
    body('wc').isNumeric().withMessage('Seleccione la cantidad de baños'),
    body('habitaciones').isNumeric().withMessage('Seleccione la cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Seleccione la cantidad de estacionamientos'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    protegerRuta,
    actualizar
);

router.post('/propiedades/eliminar/:id', protegerRuta, eliminar);

//? Areá pública
router.get('/propiedad/:id', idetinficarUsuario, mostrarPropiedad);

//? Almacenar los mensajes
router.post('/propiedad/:id', 
    idetinficarUsuario, 
    body('mensaje').isLength({min: 10}).withMessage('El mensaje no puede ir vació o es corto'),
    enviarMensaje
)

export default router;