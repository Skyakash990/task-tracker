import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  country: String,
});

export default model("User", userSchema);
