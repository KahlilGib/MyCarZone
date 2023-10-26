'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User);
      Order.belongsTo(models.Product);
      // define association here
    }
  }
  Order.init({
    orderDate: DataTypes.DATE,
    totalAmount: DataTypes.INTEGER,
    shippingAddress: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};