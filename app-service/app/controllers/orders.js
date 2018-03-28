const https = require('https');
const config = require('../config');
const db = require('../libs/db');
const soap = require('soap');

function getCourseJ(url){
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



async function getOrders(){
  try {
   //let urlj = 'https://www.cbr-xml-daily.ru/daily_json.js';
   let url = 'http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx?WSDL';
   let currentDate = new Date();
   let args = {'On_date':`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`};
   console.log(args);

   soap.createClientAsync(url).then((client)=>{
     return client.GetCursOnDate(args);
   }).then((result)=>{
     console.log(result);
   });
   //GetCursOnDate({'On_date':`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`})
   //let res = await getCourse(url);
   // let query = 'SELECT o.id, o.locator, o.date_insert, o.price, o.currency, t.amount FROM `orders` o left join (select distinct order_id, count(order_id) as amount from `order_passengers` group by order_id) t on o.id = t.order_id;';
   // let conn = await db.connectDB(config.get('mysql'));
   // let rows = await db.getData(conn, query);
   // await db.closeDB(conn);
   // let mass = [];
   //
   // for (let index in rows){
   //   let value_rus = '-';
   //   let value_сurrency = '-';
   //   let name_currency = rows[index].currency.toUpperCase();
   //   if (name_currency !== 'RUB' ){
   //     value_rus = rows[index].price * (res.Valute[name_currency].Value/res.Valute[name_currency].Nominal);
   //     value_сurrency = `${rows[index].price} ${rows[index].currency}`
   //   }else{
   //     value_rus = rows[index].price;
   //     value_сurrency = '-';
   //   }
   //   rows[index].price_rus = value_rus;
   //   rows[index].price_сurrency = value_сurrency;
   //   mass.push(rows[index]);
   // }
   // return mass;
 } catch (err) {
  throw err;
 }
}



module.exports = (req, res)=>{
  let url = 'http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx?wsdl';
  let currentDate = new Date();
  // let args = {'On_date':`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`};
  // console.log(args);
  let args = {'On_date': '2018-03-21'}
  console.log(args);
  // soap.createClientAsync(url).then((client)=>{
  //   return client.GetCursOnDate(args);
  // }).then( (result)=>{
  //   console.log(result);
  // });
  let ress = null;
  soap.createClient(url, function(err, client) {
    client.GetCursOnDate(args, function(err, result) {
        console.log(result);
        ress = Object.assign({}, result);
        // console.log(result.GetCursOnDateResult, result.GetCursOnDateResult.schema, result.GetCursOnDateResult.diffgram);
    });
});

  let mass = [];
  // let promise = getOrders();
  // promise.then( (result)=>{
  //   let rows = Object.assign({}, result);
  //   let mass = [];
  //   for (let index in rows){
  //       mass.push(rows[index]);
  //   }
    res.render('orders', { title: "Таблица заказов", rows:mass, ress:ress});
  // });
};
