import bcrypt from 'bcrypt';

const usuarios = [
    {
        nombre: 'Carlos',
        email: 'Carlos@correo.com',
        confirmado: 1,
        password: bcrypt.hashSync('Carlos12292308', 10)
    }
]

export default usuarios;