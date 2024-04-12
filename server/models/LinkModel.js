import mongoose from "mongoose";
import { nanoid } from "nanoid";

const LinkModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    originalLink: {
      type: String,
      required: true,
      unique: true,
    },
    shortenedLink: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(7),
    },
    clicks: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Link", LinkModel);
