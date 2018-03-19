const express = require('express');

const locatorsController = require('../controllers/locators');
const ordersController = require('../controllers/orders');


let router = express.Router();

router.route('/')
    .get(ordersController);

router.route('/locators')
    .get(locatorsController);

module.exports = router;
