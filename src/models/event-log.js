'use strict';

const RSVP = require('rsvp');
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  let EventLog = sequelize.define('event_log', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    type: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    user: {
      type: Sequelize.STRING,
      allowNull: false
    },

    description: {
      type: Sequelize.STRING
    },

    long_description: {
      type: Sequelize.TEXT('long')
    }
  }, {
    timestamps: true,
    underscored: true,

    classMethods: {
      record(username, type, desc, long_desc) {
        return this.create({
          user: username,
          type: type,
          description: desc,
          long_description: long_desc
        });
      }
    },

    indexes: [
      { fields: ['user', 'type', 'description'] },
      { fields: ['user', 'type'] },
      { fields: ['type'] }
    ]
  });

  // Event type
  EventLog.BACKEND_ERROR = 'Backend Error';
  EventLog.CLIENT_ERROR = 'Client Error';
  EventLog.QUERYING_RECORD = 'Querying Record';
  EventLog.CREATING_RECORD = 'Creating Record';
  EventLog.UPDATING_RECORD = 'Updating Record';
  EventLog.DELETING_RECORD = 'Deleting Record';
  EventLog.GET_CONFIGURATION = 'Get Configuration';
  EventLog.POST_CONFIGURATION = 'Post Configuration';
  EventLog.PUT_CONFIGURATION = 'Put Configuration';
  EventLog.GET_REVISION = 'Get Revision';
  EventLog.POST_REVISION = 'Post Revision';
  EventLog.PUT_REVISION = 'Put Revision';

  return EventLog;
};
