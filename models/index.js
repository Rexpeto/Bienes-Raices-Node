import Categoria from './Categoria.js';
import Propiedad from './Propiedad.js';
import Precio from './Precio.js';
import Usuario from './Usuario.js';

Precio.hasOne(Propiedad);

export {
    Categoria,
    Propiedad,
    Precio,
    Usuario
}