const express = require('express');

let routers = express.Router();

routers.route('/')
    .get(require('./main').get);

routers.route('/orders')
    .get(require('./orders').get);

routers.route('/orders/locators')
    .get(require('./locators').get);

    
// routers.route('/loc')
//     .get( (req, res)=>{
//       res.send('orders/Локатор');
//   // res.render("orders", {
//   //      title: "Таблица пассажиров",
//   //      passengers: ["gavgav@mycorp.com", "mioaw@mycorp.com"]
//   //  });
//   console.log('orders/Локатор');
// });
//
// router.get('' ()=>{
//
// })

module.exports = routers;
