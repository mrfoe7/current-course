const http = require('http');
const https = require('https');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const config = require('./config');
// const conn = require('./controllers');
// const order = require('./routers');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// require('./routes')(app);
// app.use('/order', order);
let url = 'http://www.cbr.ru/scripts/XML_daily.asp';
// let currDate = new Date();
// currDate.toISOString().substring(0, 10);
//<CharCode>AUD</CharCode> <Value>44,7937</Value> http://www.cbr.ru/scripts/XML_daily.asp
// let query = `GetCursOnDate({'On_date':${currDate}})`;

app.set('port', config.get('port') || 8080)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

function getOrder(){

}
function getLocator(){

}
app.get('/orders', (req, res)=>{
  console.log(config.get('mysql'));
  console.log('orders');
})

app.get('/orders/:field', (req, res)=>{
  console.log('orders/field');
})

app.use((req, res, next)=>{
  let err = new Error('pages not found');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next)=>{
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get( ('env') === 'dev') ? err: {}
  });
})

const server = http.createServer(app);
server.listen(config.get('port'), ()=>{
  let port = config.get("port") || 8080;
  console.log('Server runnig on port - ' + port);
})
