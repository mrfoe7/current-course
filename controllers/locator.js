const conn = require('./connection');
let query = 'SELECT op.order_id, o.locator, op.name_second, op.name_first FROM `orders` o, `order_passengers` op where op.order_id = o.id;';
let rows = [];
conn.query(query, (err, res, fields)=>{
  if (err) throw err;
  rows = JSON.stringify(res);
  console.log(JSON.stringify(res));
})

conn.end((err)=>{
  if (err) throw err;
  console.log("Disconnected");
});
console.log(rows.length);
module.exports = rows;
