'use strict';

let morgan = require('morgan');
let path = require('path');
let fs = require('fs');

module.exports = (logDirectory, env) => {
  env = env || 'development';
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

  let accessLogStream = require('file-stream-rotator').getStream({
    filename: logDirectory + '/' + env + '-access-%DATE%.log',
    frequency: 'daily',
    verbose: env === 'development',
    date_format: "YYYY-MM-DD"
  });

  return morgan('combined', {
    stream: accessLogStream
  });
};
