'use strict';

let Sequelize = require('sequelize');

const sequelize = require('../config/database');

module.exports = sequelize.define('system', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },

  version: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  underscored: true,

});
