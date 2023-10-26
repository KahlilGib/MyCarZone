'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category);
      Product.belongsToMany(models.User, { through: models.Order });
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    fuelType: DataTypes.STRING,
    transmissionType: DataTypes.STRING,
    carImage: DataTypes.STRING,
    price: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};