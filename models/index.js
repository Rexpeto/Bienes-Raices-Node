import Categoria from './Categoria.js';
import Propiedad from './Propiedad.js';
import Precio from './Precio.js';
import Usuario from './Usuario.js';

//? Crea asociación 1:1 Propiedad tiene un precio
Precio.hasOne(Propiedad, {foreignKey: 'id_precio'});

//? Crea asociación 1:1 Propiedad tiene una categoria
Categoria.hasOne(Propiedad, {foreignKey: 'id_categoria'});

//? Crea asociación 1:1 Propiedad tiene un usuario
Usuario.hasOne(Propiedad, {foreignKey: 'id_usuario'});

export {
    Categoria,
    Propiedad,
    Precio,
    Usuario
}