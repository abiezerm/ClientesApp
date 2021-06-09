const { response } = require('express');
const Cliente = require('../models/Cliente');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar email

        const clienteDB = await Cliente.findOne({ email });

        if (!clienteDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        // Verificar password

        const validPassword = bcrypt.compareSync(password, clienteDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no encontrada'
            });
        }

        // Generar el token - JWT
        const token = await generarJWT(clienteDB.id);

        res.json({
            ok: true,
            token: token
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el token - JWT
    const token = await generarJWT(uid);

    // Obtener el usuario

    const cliente = await Cliente.findById(uid);

    res.json({
        ok: true,
        token,
        cliente
    })
}


module.exports = {
    login,
    renewToken
}