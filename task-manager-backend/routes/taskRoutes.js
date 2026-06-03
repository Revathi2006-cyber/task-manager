const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.route("/")
  .post(protect, createTask)
  .get(protect, getTasks);

router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
module.exports = router;