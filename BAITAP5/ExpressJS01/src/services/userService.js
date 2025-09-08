import User from "../models/user.js";
import bcrypt from "bcrypt";

// Đăng ký
export const registerUser = async (username, email, password) => {
  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashed });
  return await newUser.save();
};

// Đăng nhập (username hoặc email)
export const loginUser = async (account, password) => {
  const user = await User.findOne({
    $or: [{ username: account }, { email: account }]
  });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  return user; // trả nguyên user (trừ password ở controller)
};

// Lấy thông tin account
export const getAccount = async (id) => {
  return await User.findById(id).select("-password");
};
