import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import usuariosRoutes from "./routes/usuariosRoutes.js";
import propiedadRoutes from './routes/propiedadRoutes.js';
import appRoutes from './routes/appRoutes.js';
import apiRoutes from './routes/apiRoutes.js'
import db from "./config/db.js";

dotenv.config({path:'.env'});

//* Crear app
const app = express();

//* Habilitar lectura de datos en los formularios
app.use(express.urlencoded({extended: true}));

//* Habilitar cookie-parser
app.use(cookieParser());

//* Habiliar CSRF
app.use(csrf({cookie: true}));

//* Conexión a la db
try {
    await db.authenticate();
    db.sync();
    console.log('conexión exitosa');
} catch (error) {
    console.log(error);
}

//* Definir puerto
const port = process.env.BD_PORT || 3000;

//* Habilitar pug
app.set('view engine', 'pug');
app.set('views', './views');

//* Carpeta pública
app.use(express.static('public'));

//* Routing
app.use('/', appRoutes);
app.use('/auth', usuariosRoutes);
app.use('/', propiedadRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});