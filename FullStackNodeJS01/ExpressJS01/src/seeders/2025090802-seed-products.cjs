'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("products", [
      {
        name: "iPhone 15",
        price: 25000000,
        description: "Điện thoại Apple mới nhất",
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "MacBook Pro",
        price: 45000000,
        description: "Laptop Apple cao cấp",
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Tai nghe Bluetooth",
        price: 1500000,
        description: "Phụ kiện tiện ích",
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  }
};
