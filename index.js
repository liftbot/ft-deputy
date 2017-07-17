'use strict';

// library
exports.diff = require('./src/lib/diff');
exports.diff2 = require('./src/lib/diff2');
exports.prettify = require('./src/lib/prettify');
exports.hash = require('./src/lib/hash');
exports.errors = require('./src/lib/errors');
exports.logger = require('./src/lib/logger');
exports.matrixApi = require('./src/lib/matrix-api');

// error class
let errors = {};
require('./src/lib/errors')(errors);
exports.FTError = errors.FTError;
exports.AuthError = errors.AuthError;
exports.ReqError = errors.ReqError;
exports.ReqParamsError = errors.ReqParamsError;
exports.NotFoundError = errors.NotFoundError;
exports.PermissionError = errors.PermissionError;

// middleware
exports.morganLog = require('./src/middlewares/morgan-log');
exports.errorCatch = require('./src/middlewares/error-catch');

// for custom Model creation
exports.Sequelize = require('sequelize');

// model
exports.models = require('./src/models');
exports.sequelize = require('./src/config/database');
exports.SettingControlFlag = require('./src/models/setting-control-flag');
exports.System = require('./src/models/system');
exports.User = require('./src/models/user');
exports.Preference = require('./src/models/preference');
exports.ActionHistory = require('./src/models/action-history');
exports.TankConfig = require('./src/models/tank-config');
exports.Configuration = require('./src/models/configuration');
exports.Revision = require('./src/models/revision');
exports.Draft = require('./src/models/draft');
exports.Permission = require('./src/models/permission');
exports.Role = require('./src/models/role');
exports.RolePermission = require('./src/models/role-permission');
exports.UserRole = require('./src/models/user-role');
exports.EventLog = require('./src/models/event-log');
exports.ReleaseVersion = require('./src/models/release-version');

// app
let app = require('./src/app');
exports.defineApp = app.defineApp;
exports.defineFilters = app.defineFilters;
exports.defineRoutes = app.defineRoutes;
exports.defineErrorHandlers = app.defineErrorHandlers;
exports.litsenProcess = app.litsenProcess;
