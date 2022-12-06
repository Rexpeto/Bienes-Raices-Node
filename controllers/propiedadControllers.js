import { validationResult } from 'express-validator';
import {Precio, Categoria, Propiedad} from '../models/index.js';

export const admin = (req, res) => {
    res.render('../views/propiedades/admin.pug', {
        pagina: 'Mis propiedades'
    });
}

//* Formulario para crear
export const crear = async (req, res) => {
    //? Consultar modelo de precio y categoria
    const [precios, categorias] = await Promise.all([
        Precio.findAll(),
        Categoria.findAll()
    ]);
    res.render('../views/propiedades/crear.pug', {
        pagina: 'Crear Propiedad',
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: {}
    });
}

//? Guarda las propiedades
export const guardar = async (req, res) => {
    //? Validaciones
    let resultado = validationResult(req);

    //? Si el arreglo de resultado está vació
    if(!resultado.isEmpty()) {
        //? Consultar modelo de precio y categoria
        const [precios, categorias] = await Promise.all([
            Precio.findAll(),
            Categoria.findAll()
        ]);

        return res.render('../views/propiedades/crear.pug', {
            pagina: 'Crear Propiedad',
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
        });
    }

    //? Crear registro
    try {
        //* Extraer datos del request
        const {titulo, descripcion, categoria:id_categoria, precio:id_precio, wc, habitaciones, estacionamiento, calle, lat, lng} = req.body;
        const {id:id_usuario} = req.usuario;

        console.log(id_usuario);

        const propiedadGuardar = await Propiedad.create({
            titulo,
            descripcion,
            wc,
            habitaciones,
            estacionamiento,
            calle,
            lat,
            lng,
            id_categoria,
            id_precio,
            id_usuario,
            imagen: ''
        });

        const {id} = propiedadGuardar;
        res.redirect(`/propiedad/agregar-imagen/${id}`);
    } catch (error) {
        console.log(error);
    }
}

//? Agrega las imagenes a la propiedad creada
export const agregarImagen = (req, res) => {
    res.render('propiedades/agregar-imagen.pug', {
        pagina: 'Agregar imagen',
        csrfToken: req.csrfToken(),
    });
}