
exports.get = (req, res) =>{
  res.render('orders', { title: "Таблица заказов", rows: require('../controllers/orders')});
}
// .get( (req, res)=>{
//   res.send("orders");
// // res.render("orders", {
// //      title: "Таблица заказов",
// //      orders: ["gavgav@mycorp.com", "mioaw@mycorp.com"],
// //      phone: "+1234567890"
// //  });
// console.log('orders');
