const Branch = require("../models/Branch");
const User = require("../models/User");
const BranchItem = require("../models/BranchItem");

const getBranches = async (req, res) => {
  try {
    const userId = req.user._id;
    const branches = await Branch.find({ userId }).populate("items", [
      "_id",
      "branchId",
      "title",
      "index",
      "url",
      "description",
      "imageUrl",
      "createdAt",
      "style",
      "active",
      "templateId"
    ]);
    res.status(200).json({
      success: true,
      branches,
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
    const formData = req.body;
    const links = formData.links;
    let branch = {
      userId,
      name: formData.name,
      description: formData.description,
      socialIcons: formData.socialIcons,
      templateId: formData.templateId,
      imageUrl: formData.imageUrl,
    };

    branch = await Branch.create({ ...branch });

    const items = links.map((link) => {
      return {
        ...link,
        branchId: branch._id,
      };
    });
    branch.items = items;
    const branchItems = await BranchItem.insertMany(items);
    console.log(branchItems);
    branch.items = branchItems.map((item) => item._id);
    

    await branch.save();

    res.status(201).json({
      success: true,
      // data: req.body,
      data: branch,
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(
      req.params.branchId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
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
    await Branch.findByIdAndDelete(req.params.branchId);
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

const getItems = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.branchId);
    res.status(200).json({
      success: true,
      data: branch.items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await BranchItem.findById(req.params.itemId);
    {
      !item
        ? res.status(404).json({
            success: false,
            message: "Item not found",
          })
        : item;
    }
    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createItem = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.branchId);
    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }
    const itemCount = branch.items.length;
    {
      itemCount === 0 ? 0 : itemCount - 1;
    }

    const item = req.body;
    const newItem = await BranchItem.create({
      ...item,
      branchId: branch._id,
      index: itemCount,
    });
    branch.items.push(newItem);
    await branch.save();
    res.status(201).json({
      success: true,
      data: branch.items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.branchId);
    const item = await BranchItem.findByIdAndUpdate(
      req.params.itemId,
      req.body,
      {
        new: true,
      }
    );
    await branch.save();
    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.branchId);
    {
      !branch
        ? res.status(404).json({
            success: false,
            message: "Branch not found",
          })
        : branch;
    }

    branch.items = branch.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );
    await BranchItem.findByIdAndDelete(req.params.itemId);
    await branch.save();
    res.status(200).json({
      success: true,
      data: branch.items,
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
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
