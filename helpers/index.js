export const esVendedor = (usuarioId, propiedadUsuarioId) => usuarioId === propiedadUsuarioId;

export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha).toISOString().slice(0, 10);

    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return new Date(fechaNueva).toLocaleDateString('es-Es', opciones);
};