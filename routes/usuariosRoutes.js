import express from "express";
import { confirmar, formularioLogin, formularioOlvido, formularioRegister, registrar } from "../controllers/usuarioControllers.js";

const router = express.Router();

router.get('/login', formularioLogin);
router.get('/register', formularioRegister);
router.post('/register', registrar);
router.get('/confirmar/:token', confirmar);
router.get('/olvide', formularioOlvido);

export default router;