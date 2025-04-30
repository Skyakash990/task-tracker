const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { createProject, getProjects, deleteProject } = require("../controllers/projectController");

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.delete("/:projectId", authMiddleware, deleteProject);


module.exports = router;
