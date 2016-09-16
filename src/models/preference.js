'use strict';

let Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('preference', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
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
        fields: ['name']
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
};
