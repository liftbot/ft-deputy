'use strict';

const Sequelize = require('sequelize');

const sequelize = require('../config/database');
const Role = require('./role');
const Permission = require('./permission');

let RolePermission = sequelize.define('role_permission', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  role_id: {
    type: Sequelize.STRING,
    allowNull: false
  },

  permission_id: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  underscored: true
});

RolePermission.belongsTo(Role, {foreignKey: 'role_id'});
Role.hasMany(RolePermission);

RolePermission.belongsTo(Permission, {foreignKey: 'permission_id'});
Permission.hasMany(RolePermission);

module.exports = RolePermission;
