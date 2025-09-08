import express from "express";
import { getProductsByCategory } from "../controllers/productController.js";

const router = express.Router();

// Lấy sản phẩm theo category (có phân trang, search)
router.get("/category/:id", getProductsByCategory);

export default router;
