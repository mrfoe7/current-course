const winston = require('winston');
const config = require('../config');

var ENV = process.env.NODE_ENV;

function getLogger(module) {

  var path = module.filename.split('/').slice(-2).join('/');
  // winston.add(winston.transports.File, { filename: 'somefile.log' });
  return new winston.createLogger({
    transports: [
      new winston.transports.Console({
        name: 'cosnsole',
        colorize: true,
        level: (ENV == 'development') ? 'debug' : 'error',
        label: path
        // timestamp: () => {
        //   return Date.now();
        // },
      })
      // new winston.transports.File({
      //   name: 'info-file',
      //   filename: 'filelog-info.log',
      //   colorize: true,
      //   level: 'log',
      //   label: path,
      //   timestamp: () => {
      //     let date = new Date();
      //     return date.getUTCString();
      //   },
      // }),
      // new winston.transports.File({
      //   name: 'error-file',
      //   filename: 'filelog-error.log',
      //   colorize: true,
      //   level: 'error',
      //   label: path,
      //   timestamp: () => {
      //     let date = new Date();
      //     return date.getUTCString();
      //   },
      // })
    ]
  });
}

module.exports = getLogger;
