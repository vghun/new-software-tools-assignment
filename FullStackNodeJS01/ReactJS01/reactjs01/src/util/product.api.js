import axios from "./axios.customize";

// Lấy danh sách sản phẩm có phân trang / lazy loading
const getProductsApi = (page = 1, limit = 8, categoryId = null) => {
 return axios.get(`/api/products/category/${categoryId}`, {
    params: { page, limit }
  });
};

// Lấy danh mục
const getCategoriesApi = () => {
  return axios.get("/api/categories");
};

export { getProductsApi, getCategoriesApi };
