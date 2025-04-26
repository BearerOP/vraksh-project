const User = require("../models/User");
const Token = require("../models/Token");
const Branch = require("../models/Branch");
const RefreshToken = require("../models/RefreshToken");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  generateToken,
  generateAccessToken,
  generateRefreshToken,
} = require("../config/jwt");
const { sendEmail } = require("../utils/emailService");
const { GOOGLE, GITHUB } = require("../config/oauth");
const axios = require("axios");

const checkUsername = async (req, res) => {
  try {
    const username = req.query.username;
    const user = await Branch.findOne({ name: username });
    {
      !user
        ? res.status(200).json({
            success: true,
            message: "Username can be assigned.",
            exists: false,
          })
        : res.status(200).json({
            success: true,
            message: "Username already exists.",
            exists: true,
          });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// const register = async (req, res) => {
//   const { username, email, password, referralCode } = req.body;
//   try {
//     const existingUser = await User.findOne({
//       $or: [{ email }, { username }]
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: existingUser.email === email
//           ? 'Email already in use'
//           : 'Username already in use',
//       });
//     }

//     let referrer = null;
//     if (referralCode) {
//       referrer = await User.findOne({ referralCode });
//       if (!referrer) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid referral code',
//         });
//       }
//     }

//     // Create user
//     const user = await User.create({
//       username,
//       email,
//       password,
//       referredBy: referrer ? referrer._id : null,
//     });

//     if (referrer) {
//       await User.findByIdAndUpdate(referrer._id, {
//         $inc: { referralCount: 1 },
//       });

//       // Create referral record
//       const Referral = require('../models/Referral');
//       await Referral.create({
//         referrer: referrer._id,
//         referred: user._id,
//         status: 'successful',
//       });
//     }

//     const token = generateToken(user._id);

//     await sendEmail({
//       to: user.email,
//       subject: 'Welcome to our platform!',
//       html: `
//         <h1>Welcome to our platform!</h1>
//         <p>Hi ${user.username},</p>
//         <p>Thank you for registering. Your referral code is: <strong>${user.referralCode}</strong></p>
//         <p>Share this code with your friends to earn rewards!</p>
//       `,
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Registration successful',
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         referralCode: user.referralCode,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//     });
//   }
// };

const login = async (req, res, email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    const token = generateAccessToken(user._id);

    return {
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Server error",
    };
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with that email",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hash = crypto.createHash("sha256").update(resetToken).digest("hex");

    await Token.create({
      userId: user._id,
      token: hash,
      type: "passwordReset",
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset. Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>This link will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const token = await Token.findOne({
      token: hashedToken,
      type: "passwordReset",
      expiresAt: { $gt: Date.now() },
    });

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const user = await User.findById(token.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.password = password;
    await user.save();

    await Token.deleteOne({ _id: token._id });

    await sendEmail({
      to: user.email,
      subject: "Password Reset Successful",
      html: `
        <h1>Password Reset Successful</h1>
        <p>Your password has been reset successfully.</p>
        <p>If you didn't make this change, please contact support immediately.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getMe = async (req, res) => {
  try {
    // console.log(req.user);

    const user = await User.findById(req.user.id);
    // console.log(user);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const register = async (req, res) => {
  const { email, username } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          existingUser.email === email
            ? "Email already in use"
            : "Username already in use",
      });
    }

    const user = await User.create({ email, username });

    res.status(201).json({
      message: "User registered. Use Magic Link to log in.",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const sendMagicLink = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      const username = email.split("@")[0];
      user = await User.create({ email, username });
    }
    // Generate magic token
    const magicCode = crypto.randomInt(100000, 999999).toString();

    // Hash the token before storing
    const hashedCode = crypto
      .createHash("sha256")
      .update(magicCode)
      .digest("hex");

    user.authKey = hashedCode;
    user.authKeyExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();
    console.log("Generated Token:", magicCode);
    console.log("Hashed Token (Stored in DB):", hashedCode);

    // Send magic link
    const magicLink = `${process.env.FRONTEND_URL}/auth?code=${magicCode}`;
    const options = {
      to: user.email,
      subject: "Your Magic Login Link",
      html: `Your magic code is ${magicCode} .
      In case you are'nt on same device try logging in at given link: ${magicLink} `,
    };
    await sendEmail(options);

    res
      .status(200)
      .json({ message: "Magic link sent to your email.", success: true });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const verifyMagicLink = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ message: "Invalid code" });
  }

  try {
    const hashedCode = crypto.createHash("sha256").update(code).digest("hex");
    console.log("Received token:", code);
    console.log("Computed Hash (For Lookup):", hashedCode);

    const user = await User.findOne({
      authKey: hashedCode,
      authKeyExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    await login(req, res, user.email);

    // Clear magic token (one-time use)
    user.authKey = null;
    user.authKeyExpire = null;
    await user.save();

    // Generate JWT
    const jwtToken = generateAccessToken(user._id);

    // res.cookie("token", jwtToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "Strict",
    // });

    return res.status(200).json({
      message: "Logged in successfully",
      token: jwtToken,
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const googleAuth = (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE.client_id}&redirect_uri=${GOOGLE.redirect_uri}&response_type=code&scope=email%20profile`;
  res.redirect(url);
};

const googleCallback = async (req, res) => {
  const { code } = req.query;

  try {
    const { data: tokenData } = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: GOOGLE.client_id,
        client_secret: GOOGLE.client_secret,
        code,
        grant_type: "authorization_code",
        redirect_uri: GOOGLE.redirect_uri,
      }
    );

    const { access_token } = tokenData;

    const { data: userInfo } = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    let user = await User.findOne({
      email: userInfo.email,
    });
    if (!user) {
      user = await User.create({
        authProvider: "google",
        providerId: userInfo.id,
        username: userInfo.name,
        email: userInfo.email,
        imageUrl: userInfo.picture,
      });
    } else {
      user.username = userInfo.name;
      user.imageUrl = userInfo.picture;
      await user.save();
    }

    // Send tokens to client
    await sendTokens(res, user._id);
    res.redirect(`${process.env.VRAKSH_APP_URL}/dashboard`);
  } catch (error) {
    console.error("Google OAuth Callback Error:", error);
    res.status(500).json({ message: "Google OAuth failed" });
  }
};

const refreshToken = async (req, res) => {
  try {
    console.log(req.headers.cookie, "cookie in headers");

    if (!req.headers.cookie) {
      return res.status(401).send("Unauthorized"); // No cookies, no token
    }

    const tokenCookie = req.headers.cookie
      .split("; ")
      .find((c) => c.startsWith("access_token="));

    if (!tokenCookie) {
      return res.status(401).send("Unauthorized"); // No access token in cookie
    }

    const token = tokenCookie.split("=")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const userId = decoded.userId;

    const storedToken = await RefreshToken.findOne({ userId });
    if (!storedToken) {
      return res.status(401).send("Unauthorized"); // Refresh token not found
    }

    const newAccessToken = generateAccessToken(userId);

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000, // 15 mins
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    res.json({ message: "Access token refreshed", success: true });
  } catch (err) {
    console.error("Error refreshing token:", err);
    res.status(403).send("Forbidden");
  }
};

const sendTokens = async (res, userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  // Store refresh token in the database (hashed)
  const storedRefreshToken = new RefreshToken({
    userId,
    token: refreshToken,
  });
  await storedRefreshToken.save();

  // Set the access token as a cookie
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000, // 15 minutes for access token
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
};

const protectedRoute = async (req, res) => {
  const token = req.headers.cookie.split("access_token=")[1].split(";")[0];
  if (!token) return res.sendStatus(401); // Unauthorized if no token

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) return res.sendStatus(404); // Not found if user doesn't exist

    res.json({
      message: "This is a protected route, user data: " + decoded.userId,
    });
  } catch (err) {
    res.sendStatus(403); // Forbidden if token is invalid or expired
  }
};

const logout = async (req, res) => {
  const token = req.headers.cookie.split("access_token=")[1].split(";")[0];
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const userId = decoded.userId;
    await RefreshToken.deleteOne({ userId }); // Delete refresh token from DB
  }
  res.clearCookie("access_token");
  res.json({ message: "Logged out successfully", success: true });
};

module.exports = {
  checkUsername,
  register,
  login,
  forgotPassword,
  resetPassword,
  getMe,
  sendMagicLink,
  verifyMagicLink,
  googleCallback,
  googleAuth,
  refreshToken,
  sendTokens,
  protectedRoute,
  logout,
};
