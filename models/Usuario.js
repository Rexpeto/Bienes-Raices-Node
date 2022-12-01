import {DataType} from 'sequelize';
import db from '../config/db';

const Usuario = db.define('usuarios', {
    nombre: {
        type: DataType.STRING,
        allowNull: false
    },
    email: {
        type: DataType.STRING,
        allowNull: false
    },
    password: {
        type: DataType.STRING,
        allowNull: false
    },
    token: DataType.STRING,
    confirmado: DataType.BOOLEAN
});

export default Usuario;