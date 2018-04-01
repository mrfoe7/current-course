const memcached = require('memcached');
const config = require('../config');

let client  = new Memcached(config.get('memcached:host'), config.get('memached:port'));

module.exports = {};
