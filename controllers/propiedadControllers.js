export const admin = (req, res) => {
    res.render('../views/propiedades/admin.pug', {
        pagina: 'Mis propiedades',
        barra: true
    });
}

//* Formulario para crear
export const crear = (req, res) => {
    res.render('../views/propiedades/crear.pug', {
        pagina: 'Crear Propiedad',
        barra: true
    });
}