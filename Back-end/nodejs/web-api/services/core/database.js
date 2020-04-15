var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    connectTimeout: 30000,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'sample'
})

module.exports = pool;