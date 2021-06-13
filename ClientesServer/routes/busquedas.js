/* 
Ruta: '/api/todo/:busqueda'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validarCampos } = require('../middlewares/ValidarCampos');
const { validarJWT } = require('../middlewares/ValidarJWT');


const {
    documentosColeccion
} = require('../controllers/Busqueda')



router.get('/coleccion/:busqueda', validarJWT, documentosColeccion);

module.exports = router;