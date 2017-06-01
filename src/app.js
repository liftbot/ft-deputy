'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const errors = require('./lib/errors');
const logger = require('./lib/logger');
const sequelize = require('./config/database');
const morganLog = require('./middlewares/morgan-log');
const errorCatch = require('./middlewares/error-catch');

module.exports.defineApp = (port, logDir, target) => {
  let env = process.env.NODE_ENV || 'development';
  if (process.env.PORT !== undefined) {
    port = process.env.PORT;
  }

  // errors
  errors(target);

  // logger
  target.logger = logger(logDir, env);
  // access log
  let accessLog = morganLog(logDir, env);

  // MiddleWare
  app.use(accessLog);
  app.use(bodyParser.json({limit: '5mb'}));
  app.use(bodyParser.urlencoded({ extended: true }));

  // port, env
  app.set('port', port);
  app.set('env', env);

  return app;
};

module.exports.defineFilters = (app, filters) => {
  (filters || []).forEach(filter => app.use(filter));
};

/**
 * {
 *   path: '/tank',
 *   routeOps: { mergeParams: true },
 *   router: function(router) { router.route('/').get; router.route('/').post; ... }
 *   routes: [
 *     {
 *       path: '/system',
 *       router: function(router) { ... }
 *     },
 *     ...
 *   ]
 * }
 */
let defineRoutes = (config, parent) => {
  let routeOps = Object.assign({}, config.routeOps);
  let router = express.Router(routeOps);

  if (config.router) {
    config.router(router);
  }
  parent.use(config.path, router);

  (config.routes || []).forEach(route => defineRoutes(route, router));
};
module.exports.defineRoutes = defineRoutes;

module.exports.defineErrorHandlers = (app, handlers) => {
  (handlers || []).forEach(handler => app.use(handler));
};

module.exports.litsenProcess = (log) => {
  // do something when app is closing
  process.on('exit', () => {
    log.info('Service is going to close......');
    sequelize.close();
  });

  // catches ctrl+c event
  process.on('SIGINT', () => {
    log.info('Ctrl + c to close the service......');
    process.exit();
  });

  process.on('uncaughtException', (err) => {
    log.error('Uncaught Exception');
    log.error(err.message, "\n" + err.stack);
    process.exit();
  });
}
