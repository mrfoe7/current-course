exports.get = (req, res) =>{
  let row = 'asd';
  res.render('locators', { title: "Список пассажиров", rows: require('../controllers/locator'), row:row});
}
