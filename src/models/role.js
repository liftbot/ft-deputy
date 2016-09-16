'use strict';

let Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('role', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    description: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: true,
    underscored: true,

    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ]
  });
};
