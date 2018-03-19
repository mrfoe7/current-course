module.exports = (err, req, res, next)=>{
  res.status(err.status || 500);
  res.render('error', {title: 'Страница не найдена', message: err.message});
}
