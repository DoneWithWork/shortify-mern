import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { matchedData, validationResult } from "express-validator";

import UserModel from "../models/UserModel.js";

export const registerUser = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array(), success: false });
  }
  const data = matchedData(req);
  const { username, email, password } = data;
  const user = new UserModel({
    username,
    email,
    password: bcrypt.hashSync(password, 10),
  });
  await user.save();
  if (!user) {
    return res.status(400).json({ message: "User not found", success: false });
  }
  return res.status(201).json({ message: "User created", success: true });
});
export const loginUser = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array(), success: false });
  }
  const data = matchedData(req);
  const { username, password } = data;
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User not found", success: false });
  }
  const pass = bcrypt.compareSync(password, user.password);
  if (!pass) {
    return res
      .status(400)
      .json({ message: "Invalid password", success: false });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  let { password: key, ...userWithoutPassword } = user;
  res.cookie("authToken", token, { httpOnly: true });
  return res.status(200).json({
    message: "User logged in",
    success: true,
    user: userWithoutPassword,
  });
});

export const LogoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("authToken");
  return res.status(200).json({ message: "User logged out", success: true });
});
