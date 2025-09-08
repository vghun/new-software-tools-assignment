// src/services/categoryService.js
import db from "../models/index.js";

export async function getAllCategoriesService() {
  return db.Category.findAll({
    attributes: ["id", "name", "description"],
    order: [["name", "ASC"]],
  });
}

export async function getCategoryByIdService(id) {
  return db.Category.findByPk(id, {
    attributes: ["id", "name", "description"],
  });
}

export async function createCategoryService(data) {
  return db.Category.create(data);
}

export async function updateCategoryService(id, data) {
  const category = await db.Category.findByPk(id);
  if (!category) return null;
  await category.update(data);
  return category;
}

export async function deleteCategoryService(id) {
  const category = await db.Category.findByPk(id);
  if (!category) return null;
  await category.destroy();
  return true;
}
