'use strict';

let Sequelize = require('sequelize');

/*
  dependency: User, Role, Permission
*/
module.exports = (sequelize, User, Role) => {
  let UserRole = sequelize.define('user_role', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    user_id: {
      type: Sequelize.STRING,
      allowNull: false
    },

    role_id: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: true
  });

  User.belongsToMany(Role, {through: UserRole});
  Role.belongsToMany(User, {through: UserRole});

  UserRole.belongsTo(User, {foreignKey: 'user_id'});
  User.hasMany(UserRole, {foreignKey: 'user_id'});

  UserRole.belongsTo(Role, {foreignKey: 'role_id'});

  return UserRole;
};
