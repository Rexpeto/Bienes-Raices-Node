import Precio from '../models/Precio.js';
import Categoria from '../models/Categoria.js';

export const admin = (req, res) => {
    res.render('../views/propiedades/admin.pug', {
        pagina: 'Mis propiedades',
        barra: true
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
        barra: true,
        categorias,
        precios
    });
}