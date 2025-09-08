// src/controllers/productController.js
import {
  getProductsByCategoryService,
  getAllCategoriesService,
} from "../services/productService.js";
import db from "../models/index.js";

export async function getProductsByCategory(req, res) {
  try {
    const categoryId = parseInt(req.params.id);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const q = (req.query.q || "").trim();

    // Kiểm tra category có tồn tại
    const category = await db.Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const result = await getProductsByCategoryService(categoryId, page, limit, q);

    res.json({
      total: result.count,
      page,
      totalPages: Math.ceil(result.count / limit),
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getAllCategories(req, res) {
  try {
    const categories = await getAllCategoriesService();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
