import bcrypt from "bcryptjs";   // import thư viện bcryptjs
import db from "../models/index.js"; // import database

const salt = bcrypt.genSaltSync(10); // thuật toán hash password

// Tạo user mới
export async function createNewUser(data) {
  try {
    let hashPasswordFromBcrypt = await hashUserPassword(data.password);
    await db.User.create({
      email: data.email,
      password: hashPasswordFromBcrypt,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender === "1" ? true : false,
      roleId: data.roleId,
    });
    return "OK create a new user successful";
  } catch (e) {
    throw e;
  }
}

// Mã hoá mật khẩu
async function hashUserPassword(password) {
  try {
    let hashPassword = await bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (e) {
    throw e;
  }
}

// Lấy tất cả user
export async function getAllUser() {
  try {
    let users = await db.User.findAll({ raw: true });
    return users;
  } catch (e) {
    throw e;
  }
}

// Lấy user theo Id
export async function getUserInfoById(userId) {
  try {
    let user = await db.User.findOne({
      where: { id: userId },
      raw: true,
    });
    return user ? user : [];
  } catch (e) {
    throw e;
  }
}

// Cập nhật user
export async function updateUser(data) {
  try {
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      await user.save();

      let allUsers = await db.User.findAll();
      return allUsers;
    } else {
      return [];
    }
  } catch (e) {
    throw e;
  }
}

// Xoá user
export async function deleteUserById(userId) {
  try {
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (user) {
      await user.destroy();
    }
  } catch (e) {
    throw e;
  }
}
