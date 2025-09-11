import { Router } from "express";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { findOne, create } from "../models/User";

const router = Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, country } = req.body;

  try {
    const existingUser = await findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await hash(password, 10);
    const user = await create({ name, email, password: hashedPassword, country });

    const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
