const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let access_token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    access_token = req.headers.authorization.split(' ')[1];
  } else if (req.headers.cookie && req.headers.cookie.includes('access_token')) {
    access_token = req.headers.cookie.split('access_token=')[1].split(';')[0];
  }
  
  if (!access_token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized to access this route' 
    });
  }
  try {
    const decoded = jwt.verify(access_token, process.env.JWT_ACCESS_SECRET);
    req.user = await User.findById(decoded.userId);
    req.access_token = access_token;
    console.log('Access Token under authMiddleware:', req.access_token);
    if (!req.user) {
      return res.status(401).json({
        success: false, 
        message: 'Not authorized to access this route' 
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized to access this route' 
    });
  }
};

module.exports = { protect }