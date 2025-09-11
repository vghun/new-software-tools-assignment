// src/route/productRoutes.js
import express from "express";
import {
  getProductsController,
  getAllCategoriesController,
  createProductController,
  searchProductsController,
} from "../controllers/productController.js";

const router = express.Router();

// Lấy sản phẩm (có thể theo category query param)
router.get("/", getProductsController);

// Lấy toàn bộ category
router.get("/categories", getAllCategoriesController);

// Tạo sản phẩm mới
router.post("/", createProductController);

// Search sản phẩm bằng Elasticsearch
router.get("/search", searchProductsController);

export default router;
