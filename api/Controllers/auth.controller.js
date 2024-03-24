import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const Login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ error: "User not found" });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Authentication failed" });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({ success: "Login successful" });
      }
    }
  } catch (error) {
    next(error);
  }
};
export const SignUp = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    const duplicateUser = await User.findOne({ username });

    if (duplicateUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    if (!user) {
      return res.status(400).json({ error: "Failed sign up" });
    }

    return res.status(201).json({ success: "User created" });
  } catch (error) {
    next(error);
  }
};
