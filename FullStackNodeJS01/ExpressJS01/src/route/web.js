import express from "express";
import authController from "../controllers/homeController.js"; // register + OTP
import { login } from "../controllers/authController.js"; // login controller
import { authenticate } from "../middlewares/authMiddleware.js";
import { validateEmailPassword, validateOTP } from "../middlewares/validateAuth.js";
import db from "../models/index.js";

const router = express.Router();

// Register + OTP
router.post("/register", authController.register);
router.post("/verify-otp", validateOTP, authController.verifyOtp);

// Login → thêm validateEmailPassword
router.post("/login", validateEmailPassword, login);

// Profile
router.get("/profile", authenticate, async (req, res) => {
  const user = await db.User.findByPk(req.user.id, {
    attributes: { exclude: ["password"] },
  });
  return res.json({ user });
});

// Forgot / Reset Password
router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-forgot-otp", validateOTP, authController.verifyForgotOtp);
router.post("/reset-password", authController.resetPassword);

export default router;
