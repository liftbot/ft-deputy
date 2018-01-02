'use strict';

let Sequelize = require('sequelize');

const sequelize = require('../config/database');

module.exports = sequelize.define('system_reflow_request', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  system_id: {
    type: Sequelize.STRING,
    allowNull: false
  },

  status: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
    timestamps: true,
    underscored: true,

    indexes: [
      {
        unique: true,
        fields: ['system_id']
      }
    ]
  });
