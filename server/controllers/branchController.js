const Branch = require("../models/Branch");
const User = require("../models/User");

const getBranches = async (req, res) => {
  try {
    const userId = req.user._id;
    const branches = await Branch.find({ userId }).populate(
      { path: "userId", select: "username imageUrl", model: User }
    );
    res.status(200).json({
      success: true,
      data: branches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBranch = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.branchId);
    res.status(200).json({
      success: true,
      data: branch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createBranch = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(req.body);
    const branch = await Branch.create({ ...req.body, userId: userId });

    console.dir(branch);

    res.status(201).json({
      success: true,
      data: branch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: branch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBranch = async (req, res) => {
  try {
    await Branch.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getBranches,
  getBranch,
  createBranch,
  updateBranch,
  deleteBranch,
};
