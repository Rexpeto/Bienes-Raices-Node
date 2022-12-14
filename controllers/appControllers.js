import { Sequelize } from "sequelize";
import { Categoria, Precio, Propiedad } from "../models/index.js";

export const inicio = async (req, res) => {

    const [categorias, precios, casas, departamentos] = await Promise.all([
        Categoria.findAll({raw: true}),
        Precio.findAll({raw: true}),
        Propiedad.findAll({
            limit: 3,
            where: {
                id_categoria: 1
            },
            include: [
                {model: Precio, as: 'precio'}
            ],
            order: [['createdAt', 'DESC']]
        }),
        Propiedad.findAll({
            limit: 3,
            where: {
                id_categoria: 2
            },
            include: [
                {model: Precio, as: 'precio'}
            ],
            order: [['createdAt', 'DESC']]
        })
    ])

    res.render('inicio', {
        pagina: 'Inicio',
        categorias,
        precios,
        casas,
        departamentos,
        csrfToken: req.csrfToken()
    });
}

export const categoria = async (req, res) => {
    const {id} = req.params;

    //? Comprobar que exista la categoria
    const categoria = await Categoria.findByPk(id);

    if(!categoria) {
        return res.redirect('/404');
    }

    //? Obtener la propiedad con la categoria
    const propiedades = await Propiedad.findAll({
        where: {
            id_categoria: id
        },
        include: [
            {model: Precio, as: 'precio'}
        ]
    });

    res.render('categoria', {
        pagina: `Categoría de ${categoria.nombre}`,
        propiedades
    });
}

export const notFound = (req, res) => {
    res.render('404', {
        pagina: 'No encontrado'
    });
}

export const buscador = async (req, res) => {
    const {termino} = req.body;
    
    //? Validar que termino no sea vació
    if(!termino.trim()) {
        return res.redirect('back');
    }

    //? Consultar propiedades
    const propiedades = await Propiedad.findAll({
        where: {
            titulo: {
                [Sequelize.Op.like]: '%' + termino + '%'
            }
        },
        include: [
            {model: Precio, as: 'precio'}
        ]
    })

    res.render('busqueda', {
        pagina: `Busqueda por ${termino}`,
        propiedades
    })
}