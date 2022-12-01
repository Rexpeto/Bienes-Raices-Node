import express from "express";
import { formularioLogin, formularioOlvido, formularioRegister } from "../controllers/usuarioControllers.js";

const router = express.Router();

router.get('/login', formularioLogin);
router.get('/register', formularioRegister);
router.get('/olvide', formularioOlvido);

export default router;