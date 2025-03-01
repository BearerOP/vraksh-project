const User = require('../models/User');
const Referral = require('../models/Referral');

const getReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find({ referrer: req.user.id })
      .populate('referred', 'username email createdAt')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: referrals.length,
      data: referrals,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

const getReferralStats = async (req, res) => {
  try {
    const totalReferrals = await Referral.countDocuments({
      referrer: req.user.id,
    });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyReferrals = await Referral.countDocuments({
      referrer: req.user.id,
      createdAt: { $gte: startOfMonth },
    });

    const user = await User.findById(req.user.id).populate(
      'referredBy',
      'username email'
    );

    const referredBy = user.referredBy;

    res.status(200).json({
      success: true,
      data: {
        totalReferrals,
        monthlyReferrals,
        referredBy,
        referralLink: `${process.env.FRONTEND_URL}/register?ref=${user.referralCode}`,
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
  getReferrals,
  getReferralStats,
};
