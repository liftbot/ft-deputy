'use strict';

let Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('action_history', {
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

    indexes: [
      {
        fields: ['user', 'event_title']
      }
    ]
  });
};
