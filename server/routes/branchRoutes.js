const express = require('express');
const router = express.Router();

const {
    getBranches,
    getBranch,
    createBranch,
    updateBranch,
    deleteBranch,
    } = require('../controllers/branchController');

const { protect } = require('../middleware/auth');

router.get('/branches', protect, getBranches);

router.get('/branch/:branchId', protect, getBranch);

router.post('/branch', protect, createBranch);

router.put('/branch/:branchId', protect, updateBranch);

router.delete('/branch/:branchId', protect, deleteBranch);



module.exports = router;
