
import db from "../models/index.js";

export const findProducts = async ({ page, limit, categoryId }) => {
  const offset = (page - 1) * limit;
  const where = {};
  if (categoryId) where.categoryId = categoryId;

  return db.Product.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
    include: [{ model: db.Category, attributes: ["id", "name"] }],
  });
};

export const createProduct = async (data) => {
  return db.Product.create(data);
};
export const findAllCategories = async () => {
  return db.Category.findAll({
    attributes: ["id", "name", "description"],
    order: [["name", "ASC"]],
  });
};