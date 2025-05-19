
const mysql = require('mysql2')

const pool = mysql.createPool(
    {
        host:                   'localhost',
        user:                   'root',
        password:               'Calles123!',
        database:               'proyectofinal',
        waitForConnections:     true,
        connectionLimit:        10,
        maxIdle:                10,
        idleTimeout:            60000,
        queueLimit: 0
    }).promise();

    console.log('conexion creada con la base de datos');

    module.exports = pool;
