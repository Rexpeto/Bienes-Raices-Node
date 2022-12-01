import express from "express";
import usuariosRoutes from "./routes/usuariosRoutes.js";

//* Crear app
const app = express();

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