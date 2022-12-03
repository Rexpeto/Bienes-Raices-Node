import categorias from "./categorias.js";
import { Categoria } from "../models/Categoria.js";
import precios from "./precios.js";
import Precio from '../models/Precio.js'
import db from "../config/db.js";

const importarDatos = async () => {
    try {
        //? Autenticar en la db
        await db.authenticate();
        console.log('Se autentico');

        //? Generar las columnas
        await db.sync();
        console.log('Genero las columnas');

        //? Insertar los datos
        await Promise.all([
            Categoria.bulkCreate(categorias),
            Precio.bulkCreate(precios)
        ]);

        console.log('Datos importados correctamente');
        process.exit(); 
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const eliminarDatos = async () => {
    try {
        //? Eliminar los datos
        await db.sync({force: true})
        console.log('Datos eliminados');
        process.exit();
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

if(process.argv[2] === '-i') {
    importarDatos();
}

if(process.argv[2] === '-e') {
    eliminarDatos();
}