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
} = require("../controllers/branchController");

const { protect } = require("../middleware/auth");

router.get("/branches", protect, getBranches);

router.get("/branch/:branchId", protect, getBranch);

router.post("/branch", protect, createBranch);

router.put("/branch/:branchId", protect, updateBranch);

router.delete("/branch/:branchId", protect, deleteBranch);

router.get("/branch/:branchId/items", protect, getItems);

router.get("/branch/item/:itemId", protect, getItem);

router.post("/branch/:branchId/item", protect, createItem);

router.put("/branch/:branchId/:itemId", protect, updateItem);

router.delete("/branch/:branchId/:itemId", protect, deleteItem);

module.exports = router;
