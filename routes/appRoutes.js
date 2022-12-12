import express from "express";
import { buscador, categoria, inicio, notFound } from "../controllers/appControllers.js";

const router = express.Router();

//? Página de inicio
router.get('/', inicio);

//? Categorias
router.get('/categorias/:id', categoria);

//? Página 404
router.get('/404', notFound);

//? Buscador
router.post('/buscador', buscador);

export default router;