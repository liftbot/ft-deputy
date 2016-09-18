'use strict';

const RSVP = require('rsvp');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('setting_control_flag', {
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
        return this.findOne({where: {name: name, status: 'active'}})
          .then(flag => RSVP.resolve(!flag ? '' : flag.value))
          .catch(err => RSVP.resolve(''))
      },

      getBooleanValue: function(name) {
        return this.findOne({where: {name: name, status: 'active'}})
          .then(flag => RSVP.resolve(!!flag && flag.value == 'true'))
          .catch(err => RSVP.resolve(false))
      }
    }
  });
};
