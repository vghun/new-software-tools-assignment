// src/controllers/productController.js
import {
  getProductsByCategory,
  getAllCategories,
  createProduct,
  searchProducts,
} from "../services/productService.js";
import db from "../models/index.js";

/**
 * Lấy danh sách sản phẩm (có thể theo category hoặc tất cả)
 */
export async function getProductsController(req, res) {
  try {
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : null;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const where = {};
    if (categoryId) {
      // kiểm tra category có tồn tại
      const category = await db.Category.findByPk(categoryId);
      if (!category) return res.status(404).json({ error: "Category not found" });
      where.categoryId = categoryId;
    }

    const { count, rows } = await db.Product.findAndCountAll({
      where,
      include: [{ model: db.Category }],
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

/**
 * Lấy toàn bộ category
 */
export async function getAllCategoriesController(req, res) {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

/**
 * Tạo sản phẩm mới (MySQL + index vào Elasticsearch)
 */
export async function createProductController(req, res) {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

/**
 * Search sản phẩm bằng Elasticsearch (fuzzy)
 */
export async function searchProductsController(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const q = (req.query.q || "").trim();

    const result = await searchProducts({ q, page, limit });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
