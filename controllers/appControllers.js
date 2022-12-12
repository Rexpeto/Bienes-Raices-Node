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
        departamentos
    });
}

export const categoria = (req, res) => {

}

export const notFound = (req, res) => {

}

export const buscador = (req, res) => {
    
}