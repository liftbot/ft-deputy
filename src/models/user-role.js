'use strict';

let Sequelize = require('sequelize');

const sequelize = require('../config/database');
const User = require('./user');
const Role = require('./role');

let UserRole = sequelize.define('user_role', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  user_id: {
    type: Sequelize.STRING,
    allowNull: false
  },

  role_id: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  underscored: true
});

UserRole.belongsTo(User, {foreignKey: 'user_id'});
User.hasMany(UserRole);

UserRole.belongsTo(Role, {foreignKey: 'role_id'});
Role.hasMany(UserRole);

module.exports = UserRole;
