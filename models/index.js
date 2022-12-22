import Categoria from './Categoria.js';
import Propiedad from './Propiedad.js';
import Precio from './Precio.js';
import Usuario from './Usuario.js';
import Mensaje from './Mensaje.js';

//? Crea asociación 1:1 Propiedad tiene un precio
Propiedad.belongsTo(Precio, {foreignKey: 'id_precio'});

//? Crea asociación 1:1 Propiedad tiene una categoria
Propiedad.belongsTo(Categoria, {foreignKey: 'id_categoria'});

//? Crea asociación 1:1 Propiedad tiene un usuario
Propiedad.belongsTo(Usuario, {foreignKey: 'id_usuario'});

//? Crea asociación 1:N Propiedad tiene muchos mensajes
Propiedad.hasMany(Mensaje, {foreignKey: 'id_propiedad'});

//? Crea asosiación 1:1 Mensaje tiene una propiedad
Mensaje.belongsTo(Propiedad, {foreignKey: 'id_propiedad'});

//? Crea asociación 1:1 Mensaje tiene un usuario
Mensaje.belongsTo(Usuario, {foreignKey: 'id_usuario'});

export {
    Categoria,
    Propiedad,
    Precio,
    Usuario,
    Mensaje
}