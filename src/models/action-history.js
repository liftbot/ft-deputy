'use strict';

const Sequelize = require('sequelize');

const sequelize = require('../config/database');

module.exports = sequelize.define('action_history', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  user: {
    type: Sequelize.STRING,
    allowNull: false
  },

  event_title: {
    type: Sequelize.STRING,
    allowNull: false
  },

  event_description: {
    type: Sequelize.TEXT('long'),
    allowNull: false
  }
  }, {
  timestamps: true,
  underscored: true,

  classMethods: {
    login(username) {
      return this.create({
        user: username,
        event_title: 'User Login',
        event_description: 'User login'
      });
    }
  },

  indexes: [
    {
      fields: ['user', 'event_title']
    }
  ]
});
