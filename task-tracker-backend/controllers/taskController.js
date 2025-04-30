const Task = require("../models/Task");
const Project = require("../models/Project");

// Create Task inside a Project
exports.createTask = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const { title, description, status, priority } = req.body; // include priority if needed

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const task = await Task.create({
      title,
      description,
      status: status?.toLowerCase() || "todo",
      project: projectId, // this should match your Task schema field name
      createdAt: new Date()
    });
    console.log("All tasks:", task);
    res.status(201).json({task});
  } catch (err) {
    console.error("Task creation failed:", err);
    res.status(500).json({ message: "Failed to create task" });
  }
};

// Get all Tasks for a Project
exports.getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { page = 1, limit = 10, status, priority } = req.query;

    const query = { project:projectId };
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const count = await Task.countDocuments(query);

    res.json({
      tasks,
      total: count,
      page: parseInt(page),
      pages: Math.ceil(count / limit)
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};


// Update Task
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        status: status?.toLowerCase(),
        priority,
        dueDate,
      },
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error("Failed to update task", err);
    res.status(500).json({ message: "Failed to update task" });
  }
};


// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    await Task.findByIdAndDelete(taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};
