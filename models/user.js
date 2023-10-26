'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserProfile);
      User.belongsToMany(models.Product, { through: models.Order });
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {msg: 'Email is required'},
        notEmpty: {msg: 'Email is required'},
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Password is required'},
        notEmpty: {msg: 'Password is required'}
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options) {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(instance.password, salt)
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};