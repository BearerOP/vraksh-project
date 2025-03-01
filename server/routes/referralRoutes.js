const express = require('express');
const router = express.Router();
const {
  getReferrals,
  getReferralStats,
} = require('../controllers/referralController');
const { protect } = require('../middleware/auth');

router.get('/referrals', protect, getReferrals);
router.get('/referral-stats', protect, getReferralStats);

module.exports = router;