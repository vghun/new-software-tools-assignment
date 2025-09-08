'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "Điện thoại",
        description: "Các loại điện thoại",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Laptop",
        description: "Các loại laptop",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
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
