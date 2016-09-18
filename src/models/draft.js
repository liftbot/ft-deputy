'use strict';

let Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('draft', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    user: {
      type: Sequelize.STRING,
      allowNull: false
    },

    system: {
      type: Sequelize.STRING,
      allowNull: false
    },

    hash: {
      type: Sequelize.STRING,
      allowNull: false
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    type: {
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
        fields: ['system', 'name', 'user']
      },
      {
        fields: ['system', 'user']
      }
    ]
  });
};
