import { registerUser, loginUser, getAccount } from "../services/userService.js";

let currentUserId = null; // lưu userId tạm ở server

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await registerUser(username, email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { account, password } = req.body;
    const user = await loginUser(account, password);
    currentUserId = user._id; // lưu id user đăng nhập
    res.json({ message: "Login success", user: { 
      id: user._id, 
      username: user.username, 
      email: user.email, 
      role: user.role 
    }});
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const getMyAccount = async (req, res) => {
  try {
    if (!currentUserId) {
      return res.status(401).json({ error: "Not logged in" });
    }
    const user = await getAccount(currentUserId);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
