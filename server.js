const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routers = require('./routers');
const config = require('./config');
const ejsLayouts = require("express-ejs-layouts");
// const conntrollers = require('./controllers');

const app = express();

app.set('port', config.get('port') || 8080)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use('/', routers);

// app.use((req, res, next)=>{
//   let err = new Error('pages not found');
//   err.status = 404;
//   next(err);
// })
//
// app.use((err, req, res, next)=>{
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: app.get( ('env') === 'dev') ? err: {}
//   });
// })

const server = http.createServer(app);
server.listen(config.get('port') || 8080, ()=>{
  let port = config.get("port") || 8080;
  console.log('Server runnig on port - ' + port);
})
