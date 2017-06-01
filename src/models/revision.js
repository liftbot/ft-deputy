'use strict';

const Sequelize = require('sequelize');

const sequelize = require('../config/database');
const Configuration = require('./configuration');

let Revision = sequelize.define('revision', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },

  /*
    diff oldStr, newStr
  */
  patch: {
    type: Sequelize.TEXT('long'),
    allowNull: false
  },

  /*
    diff newStr oldStr
    revert to past by newStr and reverse patch
      - applypath newStr, patch  return oldStr
  */
  reverse_patch: {
    type: Sequelize.TEXT('long'),
    allowNull: false
  },

  system: {
    type: Sequelize.STRING,
    allowNull: false
  },

  user: {
    type: Sequelize.STRING,
    allowNull: false
  },

  hash: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  underscored: true,

  indexes: [
    {
      name: 'idx_rev_system_user',
      fields: ['system', 'user']
    },
    {
      name: 'idx_rev_user',
      fields: ['user']
    }
  ],

  scopes: {
    search(skip, limit) {
      return {
        attributes: ['id','user', 'created_at'],
        offset: skip,
        limit: limit,
        order: 'id DESC'
      }
    }
  }
});

Revision.belongsTo(Configuration, {foreignKey: 'configuration_id'});

module.exports = Revision;
