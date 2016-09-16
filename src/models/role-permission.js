'use strict';

let Sequelize = require('sequelize');

/*
  dependency: Role, Permission
*/
module.exports = (sequelize, Role, Permission) => {
  let RolePermission = sequelize.define('role_permission', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    role_id: {
      type: Sequelize.STRING,
      allowNull: false
    },

    permission_id: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: true
  });

  Role.belongsToMany(Permission, {through: RolePermission});
  Permission.belongsToMany(Role, {through: RolePermission});

  RolePermission.belongsTo(Role, {foreignKey: 'role_id'});
  RolePermission.belongsTo(Permission, {foreignKey: 'permission_id'});

  return RolePermission;
};
