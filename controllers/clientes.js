const Cliente = require('../models/Cliente');
const { response } = require('express');
const encriptar = require('bcryptjs');


// Metodo para obtener clientes

const getClientes = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;

    const [clientes, total] = await Promise.all([
        Cliente.find()
        .skip(desde)
        .limit(5),

        Cliente.countDocuments()
    ]);

    res.json({
        ok: true,
        clientes: clientes,
        uid: req.uid,
        totalClientes: total
    });
}


// Metodo para crear clientes

const crearClientes = async(req, res = response) => {

    const { nombre, email, password, direccion } = req.body;

    try {

        const existeEmail = await Cliente.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya esta registrado...'
            })
        }

        const cliente = new Cliente(req.body);

        // Encriptar password

        const salt = encriptar.genSaltSync();
        cliente.password = encriptar.hashSync(password, salt);

        //Guardando usuario
        await cliente.save();

        res.json({
            ok: true,
            cliente
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs...'
        })
    }


}


// Metodo para actualizar clientes

const actualizarClientes = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const clienteDB = await Cliente.findById(uid);

        if (!clienteDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if (clienteDB.email !== email) {
            const existenteEmail = await Cliente.findOne({
                email: email
            });

            if (existenteEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un cliente con ese email'
                })
            }
        }

        campos.email = email;

        const clienteActualizado = await Cliente.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            cliente: clienteActualizado
        })

        res.json({
            ok: true,
            uid
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs...'
        })
    }


}

// Metodo para borrar clientes

const borrarClientes = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const existeCliente = await Cliente.findById(uid);

        if (!existeCliente) {
            return res.status(404).json({
                ok: false,
                msg: 'No exite un usuario con este id'
            });
        }

        const borrarCliente = await Cliente.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Se elimino correctamente'
        })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}


module.exports = {
    getClientes,
    crearClientes,
    actualizarClientes,
    borrarClientes
}