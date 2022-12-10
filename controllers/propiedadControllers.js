import { validationResult } from 'express-validator';
import {Precio, Categoria, Propiedad} from '../models/index.js';

export const admin = async (req, res) => {
    const {id} = req.usuario;

    const propiedades = await Propiedad.findAll({
        where: {
            id_usuario: id
        },
        include: [
            {model: Categoria, as: 'categoria'},
            {model: Precio, as: 'precio'}
        ]
    })

    res.render('../views/propiedades/admin.pug', {
        pagina: 'Mis propiedades',
        propiedades
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

export const editar = async (req, res) => {
    //? Extraer parametro
    const {id} = req.params;

    //? Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);

    if(!propiedad) {
        return res.redirect('/mis-propiedades');
    }

    //? Revisa si es el propietario de la publicación
    if(propiedad.id_usuario.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-propiedades');
    }

    //? Consultar modelo de precio y categoria
    const [precios, categorias] = await Promise.all([
        Precio.findAll(),
        Categoria.findAll()
    ]);
    res.render('../views/propiedades/editar.pug', {
        pagina: `Editar la propiedad ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: propiedad
    });
}

export const actualizar = async (req, res) => {
    //? Validaciones
    let resultado = validationResult(req);

    //? Si el arreglo de resultado está vació
    if(!resultado.isEmpty()) {
        //? Consultar modelo de precio y categoria
        const [precios, categorias] = await Promise.all([
            Precio.findAll(),
            Categoria.findAll()
        ]);

        console.log(req.body);

        return res.render('../views/propiedades/editar.pug', {
            pagina: `Editar la propiedad`,
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
        });
    }

    //? Extraer parametro
    const {id} = req.params;

    //? Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);

    if(!propiedad) {
        return res.redirect('/mis-propiedades');
    }

    //? Revisa si es el propietario de la publicación
    if(propiedad.id_usuario.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-propiedades');
    }

    //? Reescribir el objecto y actualizarlo
    try {
        const {titulo, descripcion, categoria:id_categoria, precio:id_precio, wc, habitaciones, estacionamiento, calle, lat, lng} = req.body;

        //* Actualizar el objecto en db
        propiedad.set({
            titulo,
            descripcion,
            categoria: id_categoria,
            precio: id_precio,
            wc,
            habitaciones,
            estacionamiento,
            calle,
            lat,
            lng
        });

        await propiedad.save();

        //* Setear la propiedad en memoria
        res.redirect('/mis-propiedades');

    } catch (error) {
        console.log(error);
    }
}
