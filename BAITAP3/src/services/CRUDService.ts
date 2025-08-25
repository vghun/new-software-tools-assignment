import bcrypt from "bcryptjs";   
import db from "../models/index.js"
import  User from "../models/user.js";  // import model User

const salt = bcrypt.genSaltSync(10);

// 🔹 Interface cho dữ liệu tạo user
interface IUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber?: string;
  gender: string; // "1" hoặc "0"
  roleId: string;
  id?: number;
}

// Tạo user mới
export async function createNewUser(data: IUserInput): Promise<string> {
  try {
    const hashPasswordFromBcrypt = await hashUserPassword(data.password);
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
async function hashUserPassword(password: string): Promise<string> {
  try {
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (e) {
    throw e;
  }
}

// Lấy tất cả user
export async function getAllUser(): Promise<User[]> {
  try {
    const users = await db.User.findAll({ raw: true });
    return users as User[];
  } catch (e) {
    throw e;
  }
}

// Lấy user theo Id
export async function getUserInfoById(userId: number): Promise<User | null> {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
      raw: true,
    });
    return user as User | null;
  } catch (e) {
    throw e;
  }
}

// Cập nhật user
export async function updateUser(data: IUserInput): Promise<User[] | []> {
  try {
    const user = await db.User.findOne({
      where: { id: data.id },
    });

    if (user) {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      await user.save();

      const allUsers = await db.User.findAll();
      return allUsers as User[];
    } else {
      return [];
    }
  } catch (e) {
    throw e;
  }
}

// Xoá user
export async function deleteUserById(userId: number): Promise<void> {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
    });
    if (user) {
      await user.destroy();
    }
  } catch (e) {
    throw e;
  }
}
