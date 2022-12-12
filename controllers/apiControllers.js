import { Categoria, Precio, Propiedad } from "../models/index.js";

export const propiedades = async (req, res) => {
    const propiedades = await Propiedad.findAll({
        include: [
            {model: Precio, as: 'precio'},
            {model: Categoria, as: 'categoria'}
        ]
    });
    res.json(propiedades);
}

export const categoria = async (req, res) => {
    const categorias = await Categoria.findAll();
    res.json(categorias);
}