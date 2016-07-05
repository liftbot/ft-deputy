'use strict';

module.exports = {
  morganLog: require('./middlewares/morgan-log'),
  errorCatch: require('./middlewares/error-catch'),
  errors: require('./lib/errors'),
  logger: require('./lib/logger')
};
