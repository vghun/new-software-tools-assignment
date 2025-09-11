import axios from "./axios.customize";

/**
 * Lấy danh sách sản phẩm, phân trang / lazy loading
 * Nếu categoryId = null => lấy tất cả sản phẩm
 * @param {number} page
 * @param {number} limit
 * @param {number|null} categoryId
 * @returns Promise
 */
const getProductsApi = (page = 1, limit = 8, categoryId = null) => {
  return axios.get("/api/products", {
    params: { page, limit, categoryId }, // gửi categoryId = null nếu muốn tất cả
  });
};

/**
 * Lấy tất cả danh mục
 */
const getCategoriesApi = () => {
  return axios.get("/api/categories");
};

/**
 * Search sản phẩm theo từ khóa
 */
const searchProductsApi = (q = "", page = 1, limit = 8) => {
  return axios.get("/api/products/search", {
    params: { q, page, limit },
  });
};

export { getProductsApi, getCategoriesApi, searchProductsApi };
