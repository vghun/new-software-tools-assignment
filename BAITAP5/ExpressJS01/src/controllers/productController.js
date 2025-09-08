import { getProducts } from "../services/productService.js";

export const listProducts = async (req, res) => {
  try {
    const { categoryId, page, limit } = req.query;
    const result = await getProducts(categoryId, parseInt(page) || 1, parseInt(limit) || 10);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
