import {check, validationResult} from 'express-validator';
import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';
import { generarId } from '../helpers/Tokens.js';
import { emailPassword, emailRegistro } from '../helpers/emails.js';

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

//* Validando el formularioOlvido por method POST
export const resetPassword = async (req, res) => {
    await check('email').isEmail().withMessage('No es un correo válido').run(req);

    let resultado = validationResult(req);

    //? Verificar que resultado esté vacío
    if(!resultado.isEmpty()) {
        return res.render('auth/olvide.pug', {
            pagina: 'Recuperar contraseña',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        });
    }

    //? Buscar el usuario
    const {email} = req.body;

    const usuario = await Usuario.findOne({where: {email}});

    if(!usuario) {
        return res.render('auth/olvide.pug', {
            pagina: 'Recuperar contraseña',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El email no existe!!'}]
        });
    }

    //? Generar un token y enviar email
    usuario.token = generarId();
    await usuario.save();

    //? Enviar email
    emailPassword({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token
    });

    //? Renderizar un mensaje
    res.render('templates/mensaje.pug', {
        pagina: 'Restablece tu contraseña',
        mensaje: 'Hemos enviado un email con las instrucciones'
    });
}

//* Comprueba el token del correo del password 
export const comprobarToken = async (req, res) => {
    const {token} = req.params;

    const usuario = await Usuario.findOne({where: {token}});

    //? En caso de un token inválido 
    if(!usuario) {
        return res.render('../views/auth/confirmarCuenta.pug', {
            pagina: 'Reestablecer contraseña',
            mensaje: 'Oops!! Hubo un error al reestablecer la contraseña',
            csrfToken: req.csrfToken(),
            error: true
        });
    }

    //? Mostrar formulario para modificar el password
    res.render('auth/resetPassword', {
        pagina: 'Establecer nueva contraseña',
        csrfToken: req.csrfToken()
    });
}

//* Muestra el formulario para establecer un nuevo password 
export const nuevoPassword = async (req, res) => {
    //? Verificar los datos
    await check('password').isLength({min: 6}).withMessage('El password debe ser al menos 6 caracteres').run(req);

    let resultado = validationResult(req);

    if(!resultado.isEmpty()) {
        return res.render('auth/resetPassword', {
            pagina: 'Establecer nueva contraseña',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        });
    }

    //? Identificar al usuario
    const {token} = req.params;
    const {password} = req.body;

    const usuario = await Usuario.findOne({where: {token}});
    
    //? hashear el nuevo password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    usuario.token = null;

    await usuario.save();

    //? Mensaje de exito
    res.render('../views/auth/confirmarCuenta.pug', {
        pagina: 'Contraseña establecida',
        mensaje: 'Su contraseña ha sido establecida con exito!'
    });
}