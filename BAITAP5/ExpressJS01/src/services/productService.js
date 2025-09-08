import Product from "../models/product.js";

// Lấy danh sách sản phẩm theo category + phân trang
export const getProducts = async (categoryId, page = 1, limit = 10) => {
  const query = categoryId ? { category: categoryId } : {};
  const products = await Product.find(query)
    .populate("category")
    .skip((page - 1) * limit)
    .limit(limit);
  const total = await Product.countDocuments(query);
  return { products, total };
};
