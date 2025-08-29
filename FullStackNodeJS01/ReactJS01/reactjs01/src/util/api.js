import axios from "./axios.customize";

// API Đăng ký (gửi OTP)
const registerApi = (name, email, password) => {
  return axios.post("/register", { name, email, password });
};

// API Xác thực OTP đăng ký
const verifyOtpApi = (email, otp) => {
  return axios.post("/verify-otp", { email, otp });
};

// API Đăng nhập
const loginApi = (email, password) => {
  return axios.post("/login", { email, password });
};

// API Lấy profile (JWT)
const getProfileApi = () => {
  return axios.get("/profile");
};

// API Quên mật khẩu (gửi OTP)
const forgotPasswordApi = (email) => {
  return axios.post("/forgot-password", { email });
};

// API Xác thực OTP quên mật khẩu
const verifyForgotOtpApi = (email, otp) => {
  return axios.post("/verify-forgot-otp", { email, otp });
};

// API Đặt lại mật khẩu
const resetPasswordApi = (email, newPassword) => {
  return axios.post("/reset-password", { email, newPassword });
};

export {
  registerApi,
  verifyOtpApi,
  loginApi,
  getProfileApi,
  forgotPasswordApi,
  verifyForgotOtpApi,
  resetPasswordApi
};
