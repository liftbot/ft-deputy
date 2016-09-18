'use strict';

let sequelize = require('./config/database');
let settingControlFlag = require('./models/setting-control-flag');
let user = require('./models/user');
let preference = require('./models/preference');
let actionHistory = require('./models/action-history');
let tankConfig = require('./models/tank-config');
let configuration = require('./models/configuration');
let revision = require('./models/revision');
let draft = require('./models/draft');
let permission = require('./models/permission');
let role = require('./models/role');
let rolePermission = require('./models/role-permission');
let userRole = require('./models/user-role');

module.exports = (target) => {
  let SettingControlFlag = settingControlFlag(sequelize);
  let User = user(sequelize);
  let Preference = preference(sequelize);
  let ActionHistory = actionHistory(sequelize);
  let TankConfig = tankConfig(sequelize);
  let Configuration = configuration(sequelize);
  let Revision = revision(sequelize, Configuration);
  let Draft = draft(sequelize);
  let Permission = permission(sequelize);
  let Role = role(sequelize);
  let RolePermission = rolePermission(sequelize, Role, Permission)
  let UserRole = userRole(sequelize, User, Role);

  target.sequelize = sequelize;
  target.SettingControlFlag = SettingControlFlag;
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

  target.sequelize.sync();
};
