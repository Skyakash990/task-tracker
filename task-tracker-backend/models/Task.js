const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['todo', 'in progress', 'done'], default: 'todo' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  createdAt: Date,
  completedAt: Date
});
module.exports = mongoose.model('Task', TaskSchema);

