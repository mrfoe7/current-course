exports.get = (req, res)=>{
    res.render('index', { title: "Главная страница"});
    console.log('Главная страница');
}
