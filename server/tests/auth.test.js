const request = require("supertest");
const app = require("../server");
const User = require("../models/User");
const Token = require("../models/Token");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../config/jwt");

// Disable automatic connection in server.js
jest.mock("../config/db", () => jest.fn());
// Mock email service to avoid sending actual emails during tests
jest.mock("../utils/emailService", () => ({
  sendEmail: jest.fn().mockResolvedValue(true),
}));

describe("Authentication API", () => {
  // Test user registration
  describe("POST /api/register", () => {
    it("should register a new user successfully", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "Password123",
      };

      const res = await request(app).post("/api/register").send(userData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("id");
      expect(res.body.user).toHaveProperty("referralCode");
      expect(res.body.user.username).toBe(userData.username);
      expect(res.body.user.email).toBe(userData.email);
      expect(res.body.success).toBe(true);
    });

    it("should validate required fields", async () => {
      const res = await request(app).post("/api/register").send({
        username: "testuser",
        // Missing email and password
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
      expect(res.body).toHaveProperty("errors");
    });

    it("should reject duplicate email", async () => {
      // First create a user
      await User.create({
        username: "existinguser",
        email: "duplicate@example.com",
        password: "Password123",
      });

      // Try to register with the same email
      const res = await request(app).post("/api/register").send({
        username: "newuser",
        email: "duplicate@example.com",
        password: "Password123",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("Email already in use");
    });

    it("should reject duplicate username", async () => {
      // First create a user
      await User.create({
        username: "duplicateuser",
        email: "first@example.com",
        password: "Password123",
      });

      // Try to register with the same username
      const res = await request(app).post("/api/register").send({
        username: "duplicateuser",
        email: "second@example.com",
        password: "Password123",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("Username already in use");
    });

    it("should register user with valid referral code", async () => {
      // Create a user with a referral code
      const referrer = await User.create({
        username: "referrer",
        email: "referrer@example.com",
        password: "Password123",
        referralCode: "TEST123",
      });

      // Register with referral code
      const res = await request(app).post("/api/register").send({
        username: "referred",
        email: "referred@example.com",
        password: "Password123",
        referralCode: "TEST123",
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);

      // Check that the referral relationship was established
      const referredUser = await User.findOne({
        email: "referred@example.com",
      });
      expect(referredUser.referredBy.toString()).toBe(referrer._id.toString());

      // Check that referrer's count was updated
      const updatedReferrer = await User.findById(referrer._id);
      expect(updatedReferrer.referralCount).toBe(1);
    });

    it("should reject invalid referral code", async () => {
      const res = await request(app).post("/api/register").send({
        username: "user",
        email: "user@example.com",
        password: "Password123",
        referralCode: "INVALID",
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("Invalid referral code");
    });
  });

  // Test user login
  describe("POST /api/login", () => {
    beforeEach(async () => {
      // Create a test user for login tests
      await User.create({
        username: "loginuser",
        email: "login@example.com",
        password: "Password123",
      });
    });

    it("should login successfully with valid credentials", async () => {
      const res = await request(app).post("/api/login").send({
        email: "login@example.com",
        password: "Password123",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("user");
      expect(res.body.success).toBe(true);
    });

    it("should reject login with wrong password", async () => {
      const res = await request(app).post("/api/login").send({
        email: "login@example.com",
        password: "WrongPassword",
      });

      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("Invalid credentials");
    });

    it("should reject login with non-existent email", async () => {
      const res = await request(app).post("/api/login").send({
        email: "nonexistent@example.com",
        password: "Password123",
      });

      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("Invalid credentials");
    });
  });

  // Test forgot password
  describe("POST /api/forgot-password", () => {
    beforeEach(async () => {
      // Create a test user for forgot password tests
      await User.create({
        username: "forgotuser",
        email: "forgot@example.com",
        password: "Password123",
      });
    });

    it("should send reset email for existing user", async () => {
      const res = await request(app).post("/api/forgot-password").send({
        email: "forgot@example.com",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain("Password reset email sent");

      // Check that a token was created
      const token = await Token.findOne({
        userId: (await User.findOne({ email: "forgot@example.com" }))._id,
      });
      expect(token).toBeTruthy();
      expect(token.type).toBe("passwordReset");
    });

    it("should handle non-existent email gracefully", async () => {
      const res = await request(app).post("/api/forgot-password").send({
        email: "nonexistent@example.com",
      });

      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("No user found");
    });
  });

  // Test reset password
  describe("POST /api/reset-password/:resetToken", () => {
    let user;
    let resetToken;
    let hashedToken;

    beforeEach(async () => {
      // Create a test user
      user = await User.create({
        username: "resetuser",
        email: "reset@example.com",
        password: "OldPassword123",
      });

      // Generate a reset token
      resetToken = "testresettoken123";
      hashedToken = require("crypto")
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      // Store the token
      await Token.create({
        userId: user._id,
        token: hashedToken,
        type: "passwordReset",
        expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
      });
    });

    it("should reset password with valid token", async () => {
      const res = await request(app)
        .post(`/api/reset-password/${resetToken}`)
        .send({
          password: "NewPassword123",
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain("Password reset successful");

      // Check that password was changed
      const updatedUser = await User.findById(user._id).select("+password");
      const isMatch = await updatedUser.matchPassword("NewPassword123");
      expect(isMatch).toBe(true);

      // Check that token was deleted
      const tokenExists = await Token.findOne({ token: hashedToken });
      expect(tokenExists).toBeFalsy();
    });

    it("should reject invalid reset token", async () => {
      const res = await request(app)
        .post("/api/reset-password/invalidtoken")
        .send({
          password: "NewPassword123",
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("Invalid or expired token");
    });
  });

  // Test get current user
  describe("GET /api/me", () => {
    let token;
    let user;

    beforeEach(async () => {
      // Create a test user
      user = await User.create({
        username: "profileuser",
        email: "profile@example.com",
        password: "Password123",
        referralCount: 3,
      });

      // Generate token
      token = generateToken(user._id);
    });

    it("should get current user with valid token", async () => {
      const res = await request(app)
        .get("/api/me")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user).toHaveProperty("id");
      expect(res.body.user.username).toBe(user.username);
      expect(res.body.user.email).toBe(user.email);
      expect(res.body.user.referralCount).toBe(3);
    });

    it("should reject request without token", async () => {
      const res = await request(app).get("/api/me");

      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("Not authorized");
    });

    it("should reject request with invalid token", async () => {
      const res = await request(app)
        .get("/api/me")
        .set("Authorization", "Bearer invalidtoken");

      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("Not authorized");
    });
  });
});
