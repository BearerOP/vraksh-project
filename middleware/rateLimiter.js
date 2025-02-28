// middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

// Determine if we're in test environment
const isTestEnvironment = process.env.NODE_ENV === 'test';
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isTestEnvironment ? 100 : 5, // Increase limit for tests
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 15 minutes',
  },
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: isTestEnvironment ? 100 : 3, // Increase limit for tests
  message: {
    success: false,
    message: 'Too many registration attempts, please try again after an hour',
  },
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: isTestEnvironment ? 100 : 3, // Increase limit for tests
  message: {
    success: false,
    message: 'Too many password reset attempts, please try again after an hour',
  },
});

module.exports = { loginLimiter, registerLimiter, forgotPasswordLimiter };