const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//Servidor express
const app = express();

//Configurar cors

app.use(cors());

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000')
})


// Lectura del body

app.use(express.json());


// Conexion BD
dbConnection();

// Rutas

app.use('/api/clientes', require('./routes/Clientes'));
app.use('/api/login', require('./routes/Auth'));
app.use('/api/todo', require('./routes/busquedas'));