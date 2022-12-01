import {check, validationResult} from 'express-validator';
import Usuario from '../models/Usuario.js';

//* Formulario de login 
export const formularioLogin = (req, res) => {
    res.render('auth/login.pug', {
        pagina: 'Iniciar sesión'
    });
}

//* Formulario de registro 
export const formularioRegister = (req, res) => {
    res.render('auth/register.pug', {
        pagina: 'Crear cuenta'
    });
}

//* Registra los usuarios
export const registrar = async (req, res) => {
    //? Validación
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio!!').run(req);
    await check("email").isEmail().withMessage('El email es incorrecto').run(req);
    await check('password').isLength({min: 6}).withMessage('El password debe ser al menos 6 caracteres').run(req);

    let resultado = validationResult(req);

    //? Extraer los datos
    const {nombre, email} = req.body;

    //? Verificar que resultado esté vacío
    if(!resultado.isEmpty()) {
        return res.render('auth/register', {
            pagina: 'Crear cuenta',
            errores: resultado.array(),
            usuario: {
                nombre,
                email
            }
        });
    }

    //? Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne({where: { email }});

    if(existeUsuario) {
        return res.render('auth/register', {
            pagina: 'Crear cuenta',
            errores: [{msg: 'El usuario ya existe'}],
            usuario: {
                nombre,
                email
            }
        });
    }

    const usuario = await Usuario.create(req.body);
    res.json(usuario);
}

//* Formulario de olvide password 
export const formularioOlvido = (req, res) => {
    res.render('auth/olvide.pug', {
        pagina: 'Recuperar contraseña'
    });
}