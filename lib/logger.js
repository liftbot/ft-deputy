'use strict';

let winston = require('winston');
let path = require('path');
let fs = require('fs');

let DailyRotateFile = require('winston-daily-rotate-file');
let env = process.env.NODE_ENV || 'development';

let transports = [
  (new DailyRotateFile({
    name: 'system',
    datePattern: 'yyyy-MM-dd.log',
    filename: path.join(logDirectory, env + '-'),
    json: false
  })),

  (new winston.transports.Console({
    colorize: true,
    level: 'debug'
  }))
];

let exceptionHandlers = [
  (new DailyRotateFile({
    name: 'exception',
    datePattern: 'yyyy-MM-dd.log',
    filename: path.join(logDirectory, env + '-exception-'),
    json: false,
    level: 'debug'
  })),

  (new winston.transports.Console({
    colorize: true,
    level: 'debug'
  }))
];

module.exports = (logDirectory) => {
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
  return new winston.Logger({
    transports: transports,
    exceptionHandlers: exceptionHandlers
  });
};
