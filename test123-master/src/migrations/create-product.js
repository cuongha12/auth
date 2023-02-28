'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT(10, 3)
      },
      sale: {
        type: Sequelize.FLOAT(10, 3)
      },
      categoryId: {
        type: Sequelize.INTEGER
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

    // await queryInterface.addConstraint('Products', {
    //   fields: ['categoryId'],
    //   type: 'foreign key',
    //   name: 'categoryId',
    //   references: {
    //     table: 'Categories',
    //     field: 'id',
    //   },
    //   onDelete: "CASCADE",
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
    // await queryInterface.removeConstraint('Products', {
    //   fields: ['categoryId'],
    //   type: 'foreign key',
    //   name: 'categoryId',
    //   references: {
    //     table: 'Categories',
    //     field: 'id',
    //   },
    //   onDelete: "CASCADE",
    // });
  }
};
