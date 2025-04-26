const express = require("express");
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  getMe,
  sendMagicLink,
  verifyMagicLink,
  googleAuth,
  githubAuth,
  checkUsername,
  googleCallback,
  refreshToken,
  logout,
} = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  validate,
} = require("../utils/validators");
const {
  loginLimiter,
  registerLimiter,
  forgotPasswordLimiter,
} = require("../middleware/rateLimiter");
const { protect } = require("../middleware/auth");

// Public routes
router.get("/check-username", checkUsername);
router.post(
  "/register",
  registerLimiter,
  registerValidation,
  validate,
  register
);
router.post("/login", loginLimiter, loginValidation, validate, login);
router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  forgotPasswordValidation,
  validate,
  forgotPassword
);
router.post(
  "/reset-password/:resetToken",
  resetPasswordValidation,
  validate,
  resetPassword
);
router.post("/send-magic-link", sendMagicLink); // Request Magic Link
router.get("/verify-magic-link", verifyMagicLink); // Verify Magic Link
router.get("/auth/google", googleAuth); // Google OAuth
router.get("/auth/google/callback", googleCallback);
// Protected routes
router.get("/me", protect, getMe);
router.get("/auth/refresh", refreshToken);
router.post("/auth/logout", protect, logout);

module.exports = router;
