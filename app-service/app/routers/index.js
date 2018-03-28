const express = require('express');

let router = express.Router();

router.route('/')
    .get((req, res)=>{
      res.render('index', { title: "Главная страница"})
    });

module.exports = router;
