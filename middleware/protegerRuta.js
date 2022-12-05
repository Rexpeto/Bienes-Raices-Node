import JWT from 'jsonwebtoken';
import { Usuario } from '../models/index.js';

const protegerRuta = async (req, res, next) => {
    //? Verificar el token
    const {_token} = req.cookies;
    if(!_token) {
        return res.redirect('/auth/login');
    }
    //? Comprobar token
    try {
        const decoded = JWT.verify(_token, process.env.JWT_KEY);
        const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.Id);
        
        //* Almacenar el usaurio en un request
        if(usuario) {
            req.usuario = usuario;
        } else {
            return res.redirect('/auth/login');
        }
        
        return next();
    } catch (error) {
        return res.clearCookies('_token').redirect('/auth/login');
    }
}

export default protegerRuta;