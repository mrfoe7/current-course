// const db = require('../libs/db');

const mysql = require('mysql');
const config = require('../config');

async function getLocators(){
  try {
    let query = 'SELECT op.order_id, o.locator, op.name_second, op.name_first FROM `orders` o, `order_passengers` op where op.order_id = o.id;';

    let conn = await connectDB(config.get('mysql'));
    let rows = await getData(conn, query);
    await closeDB(conn);
    return rows;
  } catch (err) {

  }
}

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

module.exports = (req, res)=>{
  let promise = getLocators();
  promise.then( (result)=>{
    let rows = Object.assign({}, result);
    let mass = [];
    for (let index in rows){
        mass.push(rows[index]);
    }
    res.render('locators', { title: "Список пассажиров", rows: mass});
  });
};
