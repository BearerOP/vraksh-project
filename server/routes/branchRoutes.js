const express = require("express");
const router = express.Router();

const {
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
  getBranchByUsername,
  reorderItems,
} = require("../controllers/branchController");

const { protect } = require("../middleware/auth");

router.get("/branches", protect, getBranches);

router.get("/branch/:branchId", protect, getBranch);

router.get("/branch/username/:username", getBranchByUsername);

router.post("/branch", protect, createBranch);

router.put("/branch/:branchId", protect, updateBranch);

router.delete("/branch/:branchId", protect, deleteBranch);

router.get("/branch/:branchId/items", protect, getItems);

router.get("/branch/item/:itemId", protect, getItem);

router.post("/branch/:branchId/item", protect, createItem);

router.put("/branch/item/:itemId", protect, updateItem);

router.delete("/branch/:branchId/:itemId", protect, deleteItem)

router.put("/branch/reorder/:branchId", protect, reorderItems);

module.exports = router;
