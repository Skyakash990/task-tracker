import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default model("Project", projectSchema);
