import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['todo', 'in progress', 'done'], default: 'todo' },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  createdAt: Date,
  completedAt: Date
});
export default model('Task', TaskSchema);

