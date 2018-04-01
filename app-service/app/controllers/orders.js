const https = require('https');
const config = require('../config');
const db = require('../libs/db');
const soap = require('soap');
const {promisify} = require('util');
const logger = require('../libs/log')(module);
const memcached = require('memcached');


function currentFDate(){
  let date = new Date();
  let month = '',
      day = '';
  if (date.getMonth() + 1 < 10){
    month = `0${date.getMonth() + 1}`;
  }else{
    month = `${date.getMonth() + 1}`;
  }
  if (date.getDate() < 10){
    day = `0${date.getDate()}`;
  }else{
    day = `${date.getDate()}`;
  }
  return `${date.getFullYear()}-${month}-${day}`;
}

function getCourseJ(url){
  return new Promise( (resolve, reject) => {
    let chunks = [];
    https.get(url, (res)=>{
      res.on('data', (data) => {
        chunks.push(data);
      }).on('end', () =>{
          let data = Buffer.concat(chunks);
          data = JSON.parse(data);

          delete data.PreviousDate;
          delete data.Timestamp;
          delete data.PreviousURL;

          resolve(data);
      });
    })
      .on('error', (err)=>{
        reject(err);
      });
  });
}

function getCourseX(url){

  let currentDate = currentFDate();
  let args = {"On_date" : currentDate};
  return new Promise((resolve, reject)=>{
    soap.createClient(url, (err, client)=>{
      if (err) reject(err);
      console.log(err);
      client.GetCursOnDate(args, (err, result)=>{
        if (err) reject(err);
        let chResult = {};
        chResult['Date'] = new Date();
        chResult['Valute'] = {};
        result = Object.assign([], result.GetCursOnDateResult.diffgram.ValuteData.ValuteCursOnDate);

        result.forEach ( (item, index)=>{
          item['NumCode'] = item.Vcode;
          item['Name'] = item.Vname;
          item['Value'] = item.Vcurs;
          item['CharCode'] = item.VchCode;
          item['Nominal'] = item.Vnom;
          delete item.attributes;
          delete item.Vcode;
          delete item.Vname;
          delete item.Vcurs;
          delete item.VchCode;
          delete item.Vnom;
          chResult.Valute[item.CharCode] = item;
        });
        resolve(chResult);
      });
    });
  });
}

async function getOrders(){
  try {
   let urlJ = 'https://www.cbr-xml-daily.ru/daily_json.js';
   let urlX = 'http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx?WSDL';

   let res = null;
   let resX = await getCourseX(urlX);
   let resJ = await getCourseJ(urlJ);
   res = (resX == null) ? resJ : resX;
   console.log(res);

   let query = 'SELECT o.id, o.locator, o.date_insert, o.price, o.currency, t.amount FROM `orders` o left join (select distinct order_id, count(order_id) as amount from `order_passengers` group by order_id) t on o.id = t.order_id;';
   let conn = await db.connectDB(config.get('mysql'));
   let rows = await db.getData(conn, query);
   await db.closeDB(conn);
   let mass = [];

   for (let index in rows){
     let value_rus = '-';
     let value_сurrency = '-';
     let name_currency = rows[index].currency.toUpperCase();
     if (name_currency != 'RUB' ){
       value_rus = rows[index].price * (res.Valute[name_currency].Value/res.Valute[name_currency].Nominal);
       value_rus = value_rus.toFixed(4);
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
    logger.error(err);
    throw err;
 }
}

module.exports = (req, res)=>{
  getOrders().then( (result)=>{
    let mass = [];
    for (let index in result){
        mass.push(result[index]);
    }
    // console.log(mass);
    logger.info(`Sending data to /orders to user`);
    res.render('orders', { title: "Таблица заказов", rows:mass});
  });
};
