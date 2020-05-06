var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    connectTimeout: 30000,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'sample'
})

module.exports = pool;