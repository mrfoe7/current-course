const memcached = require('memcached');
const config = require('../config');

let client  = new memcached(`config.get('memcached:host'):config.get('memached:port')`, config.get('memcached:options'));

module.exports = {};
