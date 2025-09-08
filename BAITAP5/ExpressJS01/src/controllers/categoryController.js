import Category from "../models/category.js";

export const listCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
