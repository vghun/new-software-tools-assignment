// services/authService.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models/index.js";

const User = db.User;

export const loginService = async ({ email, password }) => {
  // Kiểm tra email/password có gửi lên không
  if (!email || !password) {
    throw { status: 400, message: "Email và password là bắt buộc." };
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw { status: 401, message: "Email hoặc mật khẩu không đúng." };
  }

  if (!user.isStatus) {
    throw { status: 403, message: "Tài khoản chưa xác thực OTP." };
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw { status: 401, message: "Email hoặc mật khẩu không đúng." };
  }

  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  });

  return {
    message: "Đăng nhập thành công",
    accessToken: token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    },
  };
};
