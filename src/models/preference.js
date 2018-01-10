'use strict';

const Sequelize = require('sequelize');

const sequelize = require('../config/database');

module.exports = sequelize.define('preference', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  version: {
    type: Sequelize.STRING,
    allowNull: true
  },

  content: {
    type: Sequelize.TEXT('long'),
    allowNull: false
  }
}, {
  timestamps: true,
  underscored: true,

  indexes: [
    {
      unique: true,
      fields: ['name', 'version']
    }
  ],

  scopes: {
    schema: {
      where: {name: 'schema'}
    },

    mapping: {
      where: {name: 'mapping'}
    }
  }
});
