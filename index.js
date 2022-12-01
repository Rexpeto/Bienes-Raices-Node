import express from "express";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import db from "./config/db.js";

//* Crear app
const app = express();

//* Conexión a la db
try {
    await db.authenticate();
    console.log('Conexión exitosa');
} catch (error) {
    console.log(error);
}

//* Definir puerto
const port = 4000;

//* Habilitar pug
app.set('view engine', 'pug');
app.set('views', './views');

//* Carpeta pública
app.use(express.static('public'));

//* Routing
app.use('/auth', usuariosRoutes);

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});