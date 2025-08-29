import axios from "axios";

// Tạo instance mặc định cho axios
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL 
});

// Thêm interceptor để tự động gắn JWT token vào header
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Xử lý response chung
instance.interceptors.response.use(function (response) {
  return response && response.data ? response.data : response;
}, function (error) {
  return Promise.reject(error?.response?.data ?? error);
});

export default instance;
