import mongoose from "mongoose";
import { ObjectId } from "mongoose";
import nanoid from "nanoid";
/**
 * Represents the schema for a link in the database.
 *
 * @typedef {Object} LinkSchema
 * @property {string} name - The name of the link.
 * @property {string} orignalLink - The original link.
 * @property {string} shortenedLink - The shortened link (defaulted to a 10-character string).
 * @property {number} clicks - The number of clicks on the link.
 * @property {mongoose.ObjectId} user_id - The ID of the user who created the link.
 * @property {Date} createdAt - The timestamp when the link was created.
 * @property {Date} updatedAt - The timestamp when the link was last updated.
 */
const LinkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    orignalLink: {
      type: String,
      required: true,
    },
    shortenedLink: {
      type: String,
      default: () => nanoid(10),
    },
    clicks: {
      type: Number,
      default: 0,
    },
    user_id: {
      type: mongoose.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Link", LinkSchema);
// Path: api/Models/UserModel.js
