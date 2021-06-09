const { Router } = require('express');
const { check } = require('express-validator')

const { getClientes, crearClientes, actualizarClientes, borrarClientes } = require('../controllers/clientes')
const { validarCampos } = require('../middlewares/ValidarCampos');
const { validarJWT } = require('../middlewares/ValidarJWT');

const router = Router();



// Rutas de clientes - GET

router.get('/', getClientes);

// Rutas de clientes - POST

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
], crearClientes);

router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
], validarJWT, actualizarClientes);


router.delete('/:id', validarJWT, borrarClientes);


module.exports = router;