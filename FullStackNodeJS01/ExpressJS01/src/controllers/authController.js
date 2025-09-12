// controllers/authController.js
import { loginService } from "../services/authService.js";

export const login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    return res.json(result);
  } catch (err) {
    console.error("Login error:", err);
    return res.status(err.status || 500).json({ message: err.message || "Lỗi server" });
  }
};
