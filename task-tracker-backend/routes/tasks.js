const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");

router.post("/:projectId", authMiddleware, createTask);
router.get("/:projectId", authMiddleware, getTasks);
router.put("/:taskId", authMiddleware, updateTask);
router.delete("/:taskId", authMiddleware, deleteTask);

module.exports = router;
