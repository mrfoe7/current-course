const https = require('https');
const config = require('../config');
const db = require('../libs/db');

async function getOrders(){
  try {
   let url = 'https://www.cbr-xml-daily.ru/daily_json.js';
   let res = await getCourse(url);
   let query = 'SELECT o.id, o.locator, o.date_insert, o.price, o.currency, t.amount FROM `orders` o left join (select distinct order_id, count(order_id) as amount from `order_passengers` group by order_id) t on o.id = t.order_id;';
   let conn = await db.connectDB(config.get('mysql'));
   let rows = await db.getData(conn, query);
   await db.closeDB(conn);
   let mass = [];

   for (let index in rows){
     let value_rus = '-';
     let value_сurrency = '-';
     let name_currency = rows[index].currency.toUpperCase();
     if (name_currency !== 'RUB' ){
       value_rus = rows[index].price * (res.Valute[name_currency].Value/res.Valute[name_currency].Nominal);
       value_сurrency = `${rows[index].price} ${rows[index].currency}`
     }else{
       value_rus = rows[index].price;
       value_сurrency = '-';
     }
     rows[index].price_rus = value_rus;
     rows[index].price_сurrency = value_сurrency;
     mass.push(rows[index]);
   }
   return mass;
 } catch (err) {
  throw err;
 }
}

function getCourse(url){
  return new Promise( (resolve, reject) => {
    let chunks = [];
    https.get(url, (res)=>{
      res.on('data', (data) => {
        chunks.push(data);
      }).on('end', () =>{
          let data = Buffer.concat(chunks);
          resolve(JSON.parse(data));
      });
    })
      .on('error', (err)=>{
        reject(err);
      });

  });
}

module.exports = (req, res)=>{
  let promise = getOrders();
  promise.then( (result)=>{
    let rows = Object.assign({}, result);
    let mass = [];
    for (let index in rows){
        mass.push(rows[index]);
    }
    res.render('orders', { title: "Таблица заказов", rows:mass});
  });
};
