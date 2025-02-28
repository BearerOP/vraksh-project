const User = require('../models/User');
const Token = require('../models/Token');
const crypto = require('crypto');
const { generateToken } = require('../config/jwt');
const { sendEmail } = require('../utils/emailService');

const register = async (req, res) => {
  const { username, email, password, referralCode } = req.body;

  try {
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.email === email 
          ? 'Email already in use' 
          : 'Username already in use',
      });
    }

    let referrer = null;
    if (referralCode) {
      referrer = await User.findOne({ referralCode });
      if (!referrer) {
        return res.status(400).json({
          success: false,
          message: 'Invalid referral code',
        });
      }
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      referredBy: referrer ? referrer._id : null,
    });

    if (referrer) {
      await User.findByIdAndUpdate(referrer._id, {
        $inc: { referralCount: 1 },
      });

      // Create referral record
      const Referral = require('../models/Referral');
      await Referral.create({
        referrer: referrer._id,
        referred: user._id,
        status: 'successful',
      });
    }

    const token = generateToken(user._id);

    await sendEmail({
      to: user.email,
      subject: 'Welcome to our platform!',
      html: `
        <h1>Welcome to our platform!</h1>
        <p>Hi ${user.username},</p>
        <p>Thank you for registering. Your referral code is: <strong>${user.referralCode}</strong></p>
        <p>Share this code with your friends to earn rewards!</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        referralCode: user.referralCode,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        referralCode: user.referralCode,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with that email',
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hash = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    await Token.create({
      userId: user._id,
      token: hash,
      type: 'passwordReset',
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
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
      message: 'Password reset email sent',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const token = await Token.findOne({
      token: hashedToken,
      type: 'passwordReset',
      expiresAt: { $gt: Date.now() },
    });

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    const user = await User.findById(token.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.password = password;
    await user.save();

    await Token.deleteOne({ _id: token._id });

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Successful',
      html: `
        <h1>Password Reset Successful</h1>
        <p>Your password has been reset successfully.</p>
        <p>If you didn't make this change, please contact support immediately.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: 'Password reset successful',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        referralCode: user.referralCode,
        referralCount: user.referralCount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  getMe,
};