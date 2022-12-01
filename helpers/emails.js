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
        subject: 'Confirma tu cuenta en Biens Raices Node',
        text: 'Confirma tu cuenta de Bienes Raices node',
        html: `
            <p>Hola ${nombre}, confirma tu cuenta en bienes raices</p>
            <p>Tu cuenta está lista, solo debes darle al boton de confirmar: <a href="">Confirmar</a></p>
            <p>Si tu no creaste esta cuenta, ignora este correo</p>
        `
    })
}