import bcrypt from "bcryptjs";
import db from "../models/index.js";
import redisClient from "../redis.js"; // file cấu hình Redis
import crypto from "crypto";

const salt = bcrypt.genSaltSync(10);

// Hàm hash password
async function hashUserPassword(password) {
  return bcrypt.hashSync(password, salt);
}

// Hàm gửi OTP và lưu user tạm vào Redis
export async function sendOtpForRegister(data) {
  const { email, password, fullName, phoneNumber } = data;

  // Sinh OTP ngẫu nhiên 6 số
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash mật khẩu
  const hashPassword = await hashUserPassword(password);

  // Lưu thông tin tạm vào Redis (timeout 5 phút)
  const userTemp = JSON.stringify({
    email,
    password: hashPassword,
    fullName,
    phoneNumber,
    isVerified: false,
    role: "customer",
  });

  await redisClient.setEx(`otp:${email}`, 300, JSON.stringify({ otp, userTemp }));

  // TODO: gửi OTP qua SMS hoặc email
  console.log(`OTP cho ${email}: ${otp}`);
}

// Hàm xác thực OTP và tạo user
export async function verifyOtpAndCreateUser(email, otp) {
  const data = await redisClient.get(`otp:${email}`);
  if (!data) {
    throw new Error("OTP hết hạn hoặc không tồn tại");
  }

  const { otp: storedOtp, userTemp } = JSON.parse(data);

  if (otp !== storedOtp) {
    throw new Error("OTP không chính xác");
  }

  const userData = JSON.parse(userTemp);

  // Tạo user trong DB
  const newUser = await db.User.create({
    ...userData,
    isVerified: true,
  });

  // Xóa OTP trong Redis sau khi dùng
  await redisClient.del(`otp:${email}`);

  return newUser;
}
