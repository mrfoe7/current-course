const mysql = require('mysql');
const config = require('../config');

let params = config.get('mysql');

let connection = mysql.createConnection(config.get('mysql'));

connection.connect((err)=>{
    if (err) throw err;
    console.log("Connected!");
});

module.exports = connection;
