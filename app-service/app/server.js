const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');

const logger = require('./libs/log')(module);
const index = require('./routers/index');
const orders = require('./routers/orders');
const config = require('./config');
const ejsLayouts = require("express-ejs-layouts");

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs' ,'access.log'), {flag: 'a+'})

app.set('port', config.get('port') || 8080)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('common', {stream: accessLogStream}));
app.use(morgan('dev', {stream: process.stdout}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.use('/', index);
app.use('/orders', orders);

app.use(require('./middleware/notFound'));
app.use(require('./middleware/error'));

const server = http.createServer(app);
server.listen(app.get('port'), ()=>{
  logger.info(`Server runnig on port - ${app.get('port')}`);
})
