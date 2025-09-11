// src/services/productService.js
import * as productRepo from "../repositories/productRepo.js";
import * as productSearchRepo from "../repositories/productSearchRepo.js";

/**
 * Tạo sản phẩm mới, lưu vào MySQL và index vào Elasticsearch
 */
export const createProduct = async (data) => {
  const product = await productRepo.createProduct(data);

  // đồng bộ sang Elasticsearch
  await productSearchRepo.indexProduct(product.toJSON());

  return product;
};

/**
 * Tìm kiếm sản phẩm bằng Elasticsearch (fuzzy search)
 */
export const searchProducts = async (filters) => {
  return productSearchRepo.searchProducts(filters);
};

/**
 * Lấy danh sách sản phẩm theo category (MySQL)
 */
export const getProductsByCategory = async ({ categoryId, page, limit }) => {
  return productRepo.findProducts({ categoryId, page, limit });
};

/**
 * Lấy tất cả category (MySQL)
 */
export const getAllCategories = async () => {
  return productRepo.findAllCategories();
};
