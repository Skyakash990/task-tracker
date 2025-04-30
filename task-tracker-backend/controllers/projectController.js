const Project = require("../models/Project");
const Task = require("../models/Task");

// Create Project (max 4 projects per user)
exports.createProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    const existingProjects = await Project.find({ owner: userId });
    if (existingProjects.length >= 4) {
      return res.status(400).json({ message: "Maximum 4 projects allowed." });
    }

    const project = await Project.create({ name, owner: userId });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Failed to create project." });
  }
};

// Get all Projects for User
exports.getProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const projects = await Project.find({ owner: userId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects." });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Task.deleteMany({ projectId });
    await Project.findByIdAndDelete(projectId);

    res.json({ message: "Project and its tasks deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete project" });
  }
};

