const winston = require('winston');
const config = require('../config');

let ENV = process.env.NODE_ENV;
let charOS = (process.platform === 'win32') ? '\\' : '/';


function getLogger(module) {
  let path = module.filename.split(charOS).slice(-2).join(charOS);
  let date = new Date();
  date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        name: 'cosnsole',
        colorize: true,
        level: (ENV == 'development') ? 'debug' : 'error',
        label: path,
        timestamp: () => {
          return date;
        }
      }),
      new winston.transports.File({
        name: 'info-file',
        filename: './logs/info.log',
        colorize: true,
        level: 'silly',
        label: path,
        timestamp: () => {
          return date;
        },
        options: {flags: 'a+'}
      }),
      new winston.transports.File({
        name: 'error-file',
        filename: './logs/error.log',
        colorize: true,
        level: 'error',
        label: path,
        timestamp: () => {
          return date;
        },
        options: {flags: 'a+'}
      })
    ]
  });
}

module.exports = getLogger;
