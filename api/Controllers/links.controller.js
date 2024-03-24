// Define your controller function here

import Link from "../Models/Link.js";
export const RedirectToLink = async (req, res) => {
  const { shortenedLink } = req.params.id;

  const link = await Link.findOne({ shortenedLink });
  if (!link) {
    return res.status(404).send("Link not found");
  } else {
    link.clicks++;
    await link.save();
    return res.redirect(link.orignalLink);
  }
};
export const CreateLink = async (req, res) => {};
export const DeleteLink = async (req, res) => {};
export const UpdateLink = async (req, res) => {};
