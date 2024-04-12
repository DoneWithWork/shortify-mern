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
  const { name, originalLink } = data;
  const newLink = new LinkModel({
    name,
    originalLink,
    user: req.userId,
  });
  await newLink.save();
  res.status(201).json({ success: true, data: newLink._doc });
});
export const getLinks = asyncHandler(async (req, res) => {
  const links = await LinkModel.find({ user: req.userId });
  res.status(200).json({ success: true, data: links._doc });
});
export const redirectLink = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const link = await LinkModel.findOne({ shortenedLink: id });
  if (!link) {
    return res.status(404).json({ success: false, message: "Link not found" });
  }
  link.clicks += 1;
  await link.save();
  res.status(200).json({ success: true, data: link._doc });
});

export const updateLink = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array(), success: false });
  }

  const link = await LinkModel.findOne({
    shortenedLink: id,
    user: req.userId,
  });
  if (!link) {
    return res.status(404).json({ success: false, message: "Link not found" });
  }
  const data = matchedData(req);
  const { name, originalLink } = data;
  link.name = name;
  link.originalLink = originalLink;
  await link.save();
  res.status(200).json({ success: true, data: link._doc });
});

export const deleteLink = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const link = await LinkModel.findOneAndDelete({
    shortenedLink: id,
    user: req.userId,
  });
  if (!link) {
    return res.status(404).json({ success: false, message: "Link not found" });
  }

  res.status(200).json({ success: true, message: "Link deleted" });
});
