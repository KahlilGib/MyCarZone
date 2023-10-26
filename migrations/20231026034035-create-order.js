'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderDate: {
        type: Sequelize.DATE
      },
      totalAmount: {
        type: Sequelize.INTEGER
      },
      shippingAddress: {
        type: Sequelize.STRING
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      ProductId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : {
            tableName : 'Products'
          },
          key : 'id'
        }
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          model : {
            tableName : 'Users'
          },
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};