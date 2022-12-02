import jwt from 'jsonwebtoken';

export const generarId = () => Date.now().toString(32) + Math.random().toString(32).substring(2);

export const generarJWT = Id => jwt.sign({Id}, process.env.JWT_KEY, {expiresIn: '1d'});