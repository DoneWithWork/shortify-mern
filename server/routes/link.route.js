import express from "express";
import { body } from "express-validator";
import {
  getLinks,
  createLink,
  redirectLink,
  deleteLink,
  updateLink,
} from "../controllers/link.controller.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

router.post(
  "/newlink",
  body("name").notEmpty().withMessage("Name is required"),
  body("originalLink")
    .notEmpty()
    .withMessage("Orignal link is required")
    .isURL(),
  auth,
  createLink
);
router.get("/getlinks", auth, getLinks);

router.get("/redirect/:id", redirectLink);

router.post("/delete/:id", auth, deleteLink);

router.post(
  "/update/:id",
  body("name").notEmpty().withMessage("Name is required"),
  body("originalLink")
    .notEmpty()
    .withMessage("Orignal link is required")
    .isURL(),
  auth,
  updateLink
);
export default router;
