import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

export const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //? Extraer datos
    const {nombre, email, token} = datos;
    
    //? Enviar el email
    await transport.sendMail({
        from: 'Bienesraicesnode.com',
        to: email,
        subject: 'Confirma tu cuenta en Bienes Raices Node',
        text: 'Confirma tu cuenta de Bienes Raices node',
        html: `
            <p>Hola ${nombre}, confirma tu cuenta en bienes raices</p>
            <p>Tu cuenta está lista, solo debes darle al boton de confirmar: <a href="${process.env.BACKEND_URL}:${process.env.BD_PORT ?? 3000}/auth/confirmar/${token}">Confirmar</a></p>
            <p>Si tu no creaste esta cuenta, ignora este correo</p>
        `
    });
}

export const emailPassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //? Extraer datos
    const {nombre, email, token} = datos;
    
    //? Enviar el email
    await transport.sendMail({
        from: 'Bienesraicesnode.com',
        to: email,
        subject: 'Reestablecer la contraseña de Bienes Raices Node',
        text: 'Reestablecer la contraseña de Bienes Raices node',
        html: `
            <p>Hola ${nombre}, reestablecer la contraseña de tu cuenta</p>
            <p>Tu cuenta está lista, solo debes darle al boton de reestablecer la contraseña: <a href="${process.env.BACKEND_URL}:${process.env.BD_PORT ?? 3000}/auth/olvide/${token}">Reestablecer</a></p>
            <p>Si tu no quieres reestablecer la contraseña, ignora este correo</p>
        `
    });
}