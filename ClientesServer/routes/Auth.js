const { Router } = require('express');
const { login, renewToken } = require('../controllers/Auth')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/ValidarCampos');
4
const { validarJWT } = require('../middlewares/ValidarJWT')


const router = Router();

router.post('/', [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login)

router.get('/renew', validarJWT, renewToken)


module.exports = router;