'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        id: 1,
        name: "Điện thoại",
        description: "Các loại điện thoại",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Laptop",
        description: "Các loại laptop",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "Phụ kiện",
        description: "Phụ kiện điện tử",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  }
};
