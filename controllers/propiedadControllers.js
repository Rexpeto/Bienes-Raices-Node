export const admin = (req, res) => {
    res.render('../views/propiedades/admin.pug', {
        pagina: 'Mis propiedades',
        barra: true
    });
}