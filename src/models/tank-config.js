'use strict';

let Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('tank_config', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    tn_did: {
      type: Sequelize.STRING,
      allowNull: false
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
        fields: ['tn_did']
      }
    ],

    scopes: {
      tnDid: (tnDid) => {
        return {
          where: { tn_did: tnDid }
        }
      }
    }
  });
};
