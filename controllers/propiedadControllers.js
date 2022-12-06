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
        res.redirect(`/propiedades/agregar-imagen/${id}`);
    } catch (error) {
        console.log(error);
    }
}

//? Agrega las imagenes a la propiedad creada
export const agregarImagen = async (req, res) => {
    const {id} = req.params;
    const idUsuario = req.usuario.id;

    //? Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);

    if(!propiedad) {
        return res.redirect('/mis-propiedades');
    }
    //? Validar que la propiedad no este publicada
    if(propiedad.publicado) {
        return res.redirect('/mis-propiedades');
    }
    //? Validar que la propiedad es del usuario
    if(idUsuario !== propiedad.id_usuario) {
        return res.redirect('/mis-propiedades');
    }


    res.render('propiedades/agregar-imagen.pug', {
        pagina: `Agregar imagen de ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        propiedad
    });
}

export const almacenarImagen = async (req, res, next) => {
    const {id} = req.params;
    const idUsuario = req.usuario.id;

    //? Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);

    if(!propiedad) {
        return res.redirect('/mis-propiedades');
    }
    //? Validar que la propiedad no este publicada
    if(propiedad.publicado) {
        return res.redirect('/mis-propiedades');
    }
    //? Validar que la propiedad es del usuario
    if(idUsuario !== propiedad.id_usuario) {
        return res.redirect('/mis-propiedades');
    }

    try {
        const {filename} = req.file;

        //? Almacenar la imagen y publicar propiedad
        propiedad.imagen = filename;
        propiedad.publicado = 1;
        await propiedad.save();
        
        next();
    } catch (error) {
        console.log(error);
    }
}