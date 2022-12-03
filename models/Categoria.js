import { DataTypes } from "sequelize";
import db from '../config/db.js';

export const Categoria = db.define('categorias', {
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});