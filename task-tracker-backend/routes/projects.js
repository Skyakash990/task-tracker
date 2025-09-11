import { Router } from "express";
const router = Router();
import authMiddleware from "../middlewares/authMiddleware";
import { createProject, getProjects, deleteProject } from "../controllers/projectController";

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.delete("/:projectId", authMiddleware, deleteProject);


export default router;
