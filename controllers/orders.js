const conn = require('./connection');
const https = require('https');
let urlj = 'https://www.cbr-xml-daily.ru/daily_json.js';
let url = 'http://www.cbr.ru/scripts/XML_daily.asp';

let query = 'SELECT o.id, o.locator, o.date_insert, o.price, o.currency, t.amount  FROM `orders` o left join (select distinct order_id, count(order_id) as amount from `order_passengers` group by order_id) t on o.id = t.order_id;';
let rows = null;

// async () = {
//   var res = await http.get();
//   rows = await conn.query(url);
//   await conn.end();
// }
let course = null;
let res = https.get(urlj, (res)=>{
  // console.log(res);
  res.on('data', (d) => {
    course = d;
    console.log(course.Valute);
  });
})

// conn.query(query, (err, res, fields)=>{
//   if (err) throw err;
//   rows = res;
//   console.log(JSON.stringify(res));
// })
// conn.end((err)=>{
//   if (err) throw err;
//   console.log("Disconnected");
// });
// console.log(rows.length);
// let currDate = new Date();
// currDate.toISOString().substring(0, 10);
//<CharCode>AUD</CharCode> <Value>44,7937</Value> http://www.cbr.ru/scripts/XML_daily.asp
// let query = `GetCursOnDate({'On_date':${currDate}})`;
module.exports = rows;
