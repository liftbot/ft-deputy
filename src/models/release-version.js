'use strict';

const Sequelize = require('sequelize');

const sequelize = require('../config/database');

module.exports = sequelize.define('release_version', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  system: {
    type: Sequelize.STRING,
    allowNull: false
  },

  version: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: true,
  underscored: true,

  indexes: [
    {
      unique: true,
      fields: ['system']
    }
  ]
});
