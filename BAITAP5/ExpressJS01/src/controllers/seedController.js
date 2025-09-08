import Category from "../models/category.js";
import Product from "../models/product.js";

export const seedData = async (req, res) => {
  try {
    // Xóa dữ liệu cũ
    await Category.deleteMany();
    await Product.deleteMany();

    // Tạo categories
    const categories = await Category.insertMany([
      { name: "Shoes" },
      { name: "Clothes" },
      { name: "Accessories" },
    ]);

    // Tạo products demo
    const products = await Product.insertMany([
      {
        name: "Nike Air",
        price: 120,
        image: "https://via.placeholder.com/200x200.png?text=Nike+Air",
        category: categories[0]._id,
      },
      {
        name: "Adidas Pro",
        price: 150,
        image: "https://via.placeholder.com/200x200.png?text=Adidas+Pro",
        category: categories[0]._id,
      },
      {
        name: "T-shirt Basic",
        price: 25,
        image: "https://via.placeholder.com/200x200.png?text=T-shirt",
        category: categories[1]._id,
      },
      {
        name: "Cap Cool",
        price: 15,
        image: "https://via.placeholder.com/200x200.png?text=Cap",
        category: categories[2]._id,
      },
    ]);

    res.json({ categories, products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
