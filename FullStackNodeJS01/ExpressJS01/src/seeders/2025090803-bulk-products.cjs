'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [];
    const now = new Date();

    // Danh sách tên mẫu cho từng category
    const phones = ["iPhone 14", "iPhone 15", "Samsung Galaxy S23", "Xiaomi Mi 13", "Oppo Reno 10", "Vivo V27"];
    const laptops = ["MacBook Air M2", "MacBook Pro M3", "Dell XPS 13", "Asus ROG Strix", "HP Spectre", "Lenovo ThinkPad"];
    const accessories = ["Chuột không dây", "Bàn phím cơ", "Tai nghe Bluetooth", "Sạc dự phòng", "Cáp sạc Type-C", "Loa mini"];

    for (let i = 1; i <= 100; i++) {
      let categoryId;
      let name;

      if (i <= 40) { // 40 sản phẩm điện thoại
        categoryId = 1;
        name = phones[Math.floor(Math.random() * phones.length)] + ` #${i}`;
      } else if (i <= 70) { // 30 sản phẩm laptop
        categoryId = 2;
        name = laptops[Math.floor(Math.random() * laptops.length)] + ` #${i}`;
      } else { // 30 sản phẩm phụ kiện
        categoryId = 3;
        name = accessories[Math.floor(Math.random() * accessories.length)] + ` #${i}`;
      }

      products.push({
        name: name,
        price: Math.floor(Math.random() * 9000000) + 1000000, // random 1tr - 10tr
        description: `Mô tả chi tiết cho ${name}`,
        imageUrl: `https://picsum.photos/seed/product${i}/200/200`,
        categoryId: categoryId,
        createdAt: now,
        updatedAt: now
      });
    }

    await queryInterface.bulkInsert("products", products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  }
};
