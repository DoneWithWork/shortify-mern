import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { matchedData, validationResult } from "express-validator";
import LinkModel from "../models/LinkModel.js";

export const createLink = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array(), success: false });
  }
  const data = matchedData(req);
  const { name, orignalLink } = data;
  const newLink = new LinkModel({
    name,
    orignalLink,
    user: req.userId,
  });
  await newLink.save();
});
