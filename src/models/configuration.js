'use strict';

const RSVP = require('rsvp');
const Sequelize = require('sequelize');
const diff = require('../lib/diff');
const hash = require('../lib/hash');
const prettify = require('../lib/prettify');

module.exports = (sequelize) => {
  return sequelize.define('configuration', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    },

    system: {
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
        unique: true,
        name: 'idx_cfg_system_name',
        fields: ['system', 'name']
      },
      {
        name: 'idx_cfg_name',
        fields: ['name']
      }
    ],

    instanceMethods: {
      /*
        id: revisionId
        revisionHash: revisionHash
      */
      revertTo: function(revisionId, revisionHash) {
        if (revisionId == null) {
          return Revision.findOne({where: {hash: revisionHash}, order: [['id', 'DESC']]}).then(function (rev) {
            if (!rev) {
              return RSVP.reject(new NotFoundError(`Can not find revision by hash ${revisionHash}.`));
            }
            return revertToId.call(this, rev.id);
          }.bind(this));
        } else {
          return revertToId.call(this, revisionId);
        }
      },
    },

    classMethods: {
      /*
        params:
          - config: configuration
          - modifiedContent: modified by client
          - baseHash: point to baseContent
        returns:
          - config: instance of Configuration from database
          - newContent: merged content
      */
      merge: function(config, modifiedContent, baseHash) {
        let dbHash = config.hash;
        let dbContent = config.content;
        modifiedContent = prettify(modifiedContent, 'json');
        let modifiedHahs = hash.sha1(modifiedContent);

        if (baseHash == dbHash) {
          return RSVP.resolve(modifiedContent);
        } else if (baseHash === modifiedHahs) {
          return RSVP.resolve(modifiedContent);
        } else {
          return config.revertTo(null, baseHash).then(baseContent => {
            let mergeResult = diff.merge(dbContent, baseContent, modifiedContent);
            if (mergeResult.exitStatus === 0) {  // merged
              return RSVP.resolve(mergeResult.text);
            } else if (mergeResult.exitStatus === 1) { // conflict
              let err = new FTError('Conflict when merge configuration');
              err.code = 428;
              err.customData = {text: mergeResult.text, hash: dbHash};
              return RSVP.reject(err);
            } else {  // status === 2 or others
              logger.error(`${(new Date()).toString()},
                Can't merge these files \n ${dbContent} \n ${baseContent} \n ${modifiedContent} \n Error message, ${mergeResult.error}`);
              return RSVP.reject(new FTError('There is something wrong when merging your changes to latest record.'));
            }
          });
        }
      },

      createConfig: function(system, name, content) {
        let type = 'json';
        content = prettify(content, type);
        return this.create({
          name: name,
          type: type,
          content: content,
          system: system,
          hash: hash.sha1(content)
        });
      }
    }
  });
}

function revertToId(revisionId) {
  return Revision.findAll({
    where: {
      configuration_id: this.id,
      id: {gte: revisionId}
    },
    order: 'id DESC'
  }).then(function(revs) {
    if (revs.length == 0) {
      return RSVP.reject(new FTError(`Can not find revision by id ${revisionId}.`));
    }
    let baseContent = this.content;
    for (let i = 0; i < revs.length; i++) {
      baseContent = diff.applyPatch(baseContent, revs[i].reverse_patch);
      if (!baseContent) {
        return RSVP.reject(new FTError(`Reversion Failed!`));
      }
    }
    return RSVP.resolve(baseContent);
  }.bind(this));
}
