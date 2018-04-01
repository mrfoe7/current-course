const db = require('../libs/db');
const config = require('../config');
const logger = require('../libs/log')(module);

async function getLocators(){
  try {
    let query = `SELECT op.order_id, o.locator, op.name_second, op.name_first FROM \`orders\` o,
     \`order_passengers\` op where op.order_id = o.id;`;
    let conn = await db.connectDB(config.get('mysql'));
    let rows = await db.getData(conn, query);
    await db.closeDB(conn);
    return rows;
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

module.exports = (req, res)=>{
  let promise = getLocators();
  promise.then( (result)=>{
    let rows = Object.assign({}, result);
    let mass = [];
    for (let index in rows){
        mass.push(rows[index]);
    }
    logger.info(`Sending data to /orders/locators to user`);
    res.render('locators', { title: "Список пассажиров", rows: mass});
  });
};
