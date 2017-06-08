'use strict';

const RSVP = require('rsvp');
const Sequelize = require('sequelize');

const sequelize = require('../config/database');

module.exports = sequelize.define('setting_control_flag', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  value: {
    type: Sequelize.STRING,
    allowNull: false
  },

  description: {
    type: Sequelize.STRING
  },

  owner: {
    type: Sequelize.STRING,
    allowNull: false
  },

  updated_by: {
    type: Sequelize.STRING,
    allowNull: false
  },

  /*
    Boolean, String
  */
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  /*
    active, deleted
  */
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  timestamps: true,
  underscored: true,

  indexes: [
    {
      unique: true,
      fields: ['name']
    }
  ],

  classMethods: {
    getStringValue: function(name) {
      let f = (SETTING_CONTROL_FLAGS || []).filter(flag => name === flag.name)[0];
      return !f ? '' : f.value;
    },

    getBooleanValue: function(name) {
      let f = (SETTING_CONTROL_FLAGS || []).filter(flag => name === flag.name)[0];
      return !!f && f.value == 'true';
    }
  }
});
