
const request = require("supertest");
const app = require("../server");
const User = require("../models/User");
const Referral = require("../models/Referral");
const { generateToken } = require("../config/jwt");

// Disable automatic connection in server.js
jest.mock("../config/db", () => jest.fn());

describe("Referral API", () => {
  let referrerUser;
  let referredUser1;
  let referredUser2;
  let referrerToken;

  beforeEach(async () => {
    // Create referrer user
    referrerUser = await User.create({
      username: "referrer",
      email: "referrer@example.com",
      password: "Password123",
      referralCode: "REFCODE",
      referralCount: 2,
    });

    // Create two referred users
    referredUser1 = await User.create({
      username: "referred1",
      email: "referred1@example.com",
      password: "Password123",
      referredBy: referrerUser._id,
    });

    referredUser2 = await User.create({
      username: "referred2",
      email: "referred2@example.com",
      password: "Password123",
      referredBy: referrerUser._id,
    });

    // Create referral records
    await Referral.create({
      referrer: referrerUser._id,
      referred: referredUser1._id,
      status: "successful",
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
    });

    await Referral.create({
      referrer: referrerUser._id,
      referred: referredUser2._id,
      status: "successful",
      createdAt: new Date(), // Today
    });

    // Generate token for referrer
    referrerToken = generateToken(referrerUser._id);
  });

  // Test get referrals
  describe("GET /api/referrals", () => {
    it("should get all referrals for authenticated user", async () => {
      const res = await request(app)
        .get("/api/referrals")
        .set("Authorization", `Bearer ${referrerToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.data[0].referred).toHaveProperty("username");
      expect(res.body.data[0].referred).toHaveProperty("email");
    });

    it("should return empty array if user has no referrals", async () => {
      // Create a user with no referrals
      const noReferralsUser = await User.create({
        username: "noreferrals",
        email: "noreferrals@example.com",
        password: "Password123",
      });

      const token = generateToken(noReferralsUser._id);

      const res = await request(app)
        .get("/api/referrals")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(0);
      expect(res.body.data).toHaveLength(0);
    });

    it("should reject unauthorized access", async () => {
      const res = await request(app).get("/api/referrals");

      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
    });
  });

  // Test get referral stats
  describe("GET /api/referral-stats", () => {
    it("should get referral statistics for authenticated user", async () => {
      const res = await request(app)
        .get("/api/referral-stats")
        .set("Authorization", `Bearer ${referrerToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("totalReferrals");
      expect(res.body.data).toHaveProperty("monthlyReferrals");
      expect(res.body.data).toHaveProperty("referralLink");
      expect(res.body.data.totalReferrals).toBe(2);
      expect(res.body.data.monthlyReferrals).toBe(1); // One referral is from today
    });

    it("should include who referred the user if applicable", async () => {
      // Create a user who was referred by someone
      const anotherReferrer = await User.create({
        username: "anotherreferrer",
        email: "another@example.com",
        password: "Password123",
      });

      const referredByUser = await User.create({
        username: "referredby",
        email: "referredby@example.com",
        password: "Password123",
        referredBy: anotherReferrer._id,
      });

      const token = generateToken(referredByUser._id);

      const res = await request(app)
        .get("/api/referral-stats")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.referredBy).toBeTruthy();
      expect(res.body.data.referredBy.username).toBe("anotherreferrer");
    });

    it("should reject unauthorized access", async () => {
      const res = await request(app).get("/api/referral-stats");

      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
    });
  });
});
