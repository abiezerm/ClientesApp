const { response } = require('express');

const Cliente = require('../models/Cliente');



// Buscar clientes

const documentosColeccion = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    try {
        let data = await Cliente.find({ nombre: regex })

        res.json({
            ok: true,
            resultados: data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}


module.exports = {
    documentosColeccion
}