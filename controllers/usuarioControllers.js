import {check, validationResult} from 'express-validator';
import Usuario from '../models/Usuario.js';
import { generarId } from '../helpers/Tokens.js';
import { emailRegistro } from '../helpers/emails.js';

//* Formulario de login 
export const formularioLogin = (req, res) => {
    res.render('auth/login.pug', {
        pagina: 'Iniciar sesión',
        csrfToken: req.csrfToken()
    });
}

//* Formulario de registro 
export const formularioRegister = (req, res) => {
    res.render('auth/register.pug', {
        pagina: 'Crear cuenta',
        csrfToken: req.csrfToken()
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
    const {nombre, email, password} = req.body;

    //? Verificar que resultado esté vacío
    if(!resultado.isEmpty()) {
        return res.render('auth/register', {
            pagina: 'Crear cuenta',
            errores: resultado.array(),
            csrfToken: req.csrfToken(),
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
            csrfToken: req.csrfToken(),
            usuario: {
                nombre,
                email
            }
        });
    }

    //? Almacenar un usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    });

    //? Envia email de confirmación
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    });

    //? Mostrar mensaje de confirmación
    res.render('templates/mensaje.pug', {
        pagina: 'Confirma tu cuenta',
        mensaje: 'Revisa tu correo electronico para confirmar tu cuenta'
    });
}

//* Confirma el usuario por medio del token
export const confirmar = async (req, res) => {
    const {token} = req.params;
    console.log(token);

    //? Verificar si el token es válido
    const usuario = await Usuario.findOne({where: {token}});

    if(!usuario) {
        return res.render('../views/auth/confirmarCuenta.pug', {
            pagina: 'Confimar cuenta',
            mensaje: 'Oops!! Hubo un error al confirmar tu cuenta',
            csrfToken: req.csrfToken(),
            error: true
        });
    }

    //? Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    //?  Mostrar el mensaje de confirmación
    res.render('../views/auth/confirmarCuenta.pug', {
        pagina: 'Confimar cuenta',
        mensaje: 'Tu cuenta ha sido confirmada con exito!',
        csrfToken: req.csrfToken()
    });
}

//* Formulario de olvide password 
export const formularioOlvido = (req, res) => {
    res.render('auth/olvide.pug', {
        pagina: 'Recuperar contraseña',
        csrfToken: req.csrfToken()
    });
}