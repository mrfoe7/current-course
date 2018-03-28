const mysql = require('mysql');
const config = require('../config');

function connectDB(config){
  return new Promise( (resolve, reject) => {
    let con = mysql.createConnection(config);
    con.connect( (err) => {
      err ? reject(err) : resolve(con);
    });
  });
}

function getData(connect, query){
  return new Promise ( (resolve, reject) => {
    connect.query(query, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

function closeDB(connect){
  return new Promise( (resolve, reject) => {
    connect.end( (err) => {
      err ? reject(err) : resolve('Disconnected');
    });
  });
}

module.exports = {
  connectDB,
  getData,
  closeDB
}
