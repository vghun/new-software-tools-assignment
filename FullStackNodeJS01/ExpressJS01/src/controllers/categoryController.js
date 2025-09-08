// src/controllers/categoryController.js
import {
  getAllCategoriesService,
  getCategoryByIdService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} from "../services/categoryService.js";

export async function getAllCategories(req, res) {
  try {
    const categories = await getAllCategoriesService();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getCategoryById(req, res) {
  try {
    const category = await getCategoryByIdService(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function createCategory(req, res) {
  try {
    const newCategory = await createCategoryService(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid data" });
  }
}

export async function updateCategory(req, res) {
  try {
    const category = await updateCategoryService(req.params.id, req.body);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid data" });
  }
}

export async function deleteCategory(req, res) {
  try {
    const deleted = await deleteCategoryService(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
