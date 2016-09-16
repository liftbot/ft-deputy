'use strict';

let winston = require('winston');
let path = require('path');
let fs = require('fs');
let DailyRotateFile = require('winston-daily-rotate-file');

let formatter = function(options) {
  // Return string will be passed to logger.
  return options.level.toUpperCase() + ": " + options.meta.date + "\n" +
    options.message + "\n" + options.meta.stack.join("\n");
};

module.exports = (logDirectory, env) => {
  env = env || 'development';
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

  let transports = [
    (new DailyRotateFile({
      name: 'system',
      datePattern: 'yyyy-MM-dd.log',
      filename: path.join(logDirectory, env + '-'),
      json: false
    })),

    (new winston.transports.Console({
      colorize: true,
      level: 'debug',
      json: false
    }))
  ];

  let exceptionHandlers = [
    (new DailyRotateFile({
      name: 'exception',
      datePattern: 'yyyy-MM-dd.log',
      filename: path.join(logDirectory, env + '-exception-'),
      level: 'debug',
      json: false,
      formatter: formatter
    })),

    (new winston.transports.Console({
      colorize: true,
      level: 'debug',
      json: false,
      formatter: formatter
    }))
  ];

  return new winston.Logger({
    transports: transports,
    exceptionHandlers: exceptionHandlers
  });
};
