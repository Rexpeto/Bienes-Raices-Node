import express from "express";
import { 
    autenticar,
    comprobarToken, confirmar, 
    formularioLogin, formularioOlvido, 
    formularioRegister, nuevoPassword, 
    registrar, resetPassword 
} from "../controllers/usuarioControllers.js";

const router = express.Router();

router.get('/login', formularioLogin);
router.post('/login', autenticar);
router.get('/register', formularioRegister);
router.post('/register', registrar);
router.get('/confirmar/:token', confirmar);
router.get('/olvide', formularioOlvido);
router.post('/olvide', resetPassword);

//? Almacena el nuevo password
router.get('/olvide/:token', comprobarToken);
router.post('/olvide/:token', nuevoPassword);

export default router;