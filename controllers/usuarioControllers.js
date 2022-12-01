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

//* Formulario de olvide password 
export const formularioOlvido = (req, res) => {
    res.render('auth/olvide.pug', {
        pagina: 'Recuperar contraseña'
    });
}