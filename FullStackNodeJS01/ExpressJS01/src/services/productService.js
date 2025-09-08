// src/services/productService.js
import db from "../models/index.js";
import { Op } from "sequelize";

export async function getProductsByCategoryService(categoryId, page, limit, q) {
  const offset = (page - 1) * limit;
  const where = { categoryId };

  if (q) where.name = { [Op.like]: `%${q}%` };

  return db.Product.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
    include: [{ model: db.Category, attributes: ["id", "name"] }],
  });
}

export async function getAllCategoriesService() {
  return db.Category.findAll({
    attributes: ["id", "name", "description"],
    order: [["name", "ASC"]],
  });
}
