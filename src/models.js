'use strict';

let sequelize = require('./config/database');
let SettingControlFlag = require('./models/setting-control-flag');
let System = require('./models/system');
let User = require('./models/user');
let Preference = require('./models/preference');
let ActionHistory = require('./models/action-history');
let TankConfig = require('./models/tank-config');
let Configuration = require('./models/configuration');
let Revision = require('./models/revision');
let Draft = require('./models/draft');
let Permission = require('./models/permission');
let Role = require('./models/role');
let RolePermission = require('./models/role-permission');
let UserRole = require('./models/user-role');
let EventLog = require('./models/event-log');
let ReleaseVersion = require('./models/release-version');
let TargetSystem = require('./models/target-system');

module.exports = (target) => {
  target.sequelize = sequelize;
  target.EventLog = EventLog;
  target.SettingControlFlag = SettingControlFlag;
  target.System = System;
  target.User = User;
  target.Preference = Preference;
  target.ActionHistory = ActionHistory;
  target.TankConfig = TankConfig;
  target.Configuration = Configuration;
  target.Revision = Revision;
  target.Draft = Draft;
  target.Permission = Permission;
  target.Role = Role;
  target.RolePermission = RolePermission;
  target.UserRole = UserRole;
  target.ReleaseVersion = ReleaseVersion;
  target.TargetSystem = TargetSystem;

  target.sequelize.sync();
};
