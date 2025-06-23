'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Account, { foreignKey: 'userId' });
  };
  return User;
};
