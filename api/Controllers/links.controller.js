// Define your controller function here
import jwt from "jsonwebtoken";
import Link from "../Models/Link.js";
export const RedirectToLink = async (req, res) => {
  const { shortenedLink } = req.params.id;

  const link = await Link.findOne({ shortenedLink });
  if (!link) {
    return res.status(404).send("Link not found");
  } else {
    link.clicks++;
    await link.save();
    return res.status(200).json({ link: link.orignalLink });
  }
};
//use middleware to set the user_id
export const CreateLink = async (req, res, next) => {
  const token = req.cookies.token;
  const { name, orignalLink } = req.body;
  if (!name || originalLink) {
    return res
      .status(400)
      .json({ error: "Name and original link are required" });
  }
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user_id = decoded.id;
    const link = await Link.create({ name, orignalLink, user_id });
    if (!link) {
      return res.status(400).json({ error: "Failed to create link" });
    } else {
      return res.status(201).json({ success: "Link created" });
    }
  } catch (error) {
    next(error);
  }
};
export const DeleteLink = async (req, res) => {
  const token = req.cookies.token;
};
export const UpdateLink = async (req, res) => {};
