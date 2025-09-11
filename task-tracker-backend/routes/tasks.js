import { Router } from "express";
const router = Router();
import authMiddleware from "../middlewares/authMiddleware";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController";

router.post("/:projectId", authMiddleware, createTask);
router.get("/:projectId", authMiddleware, getTasks);
router.put("/:taskId", authMiddleware, updateTask);
router.delete("/:taskId", authMiddleware, deleteTask);

export default router;
