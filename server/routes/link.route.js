import express from "express";
import { body } from "express-validator";
import UserModel from "../models/UserModel";
import {
  LogoutUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller";
const router = express.Router();

router.post(
  "/newlink",
  body("name").isEmail().notEmpty().withMessage("Name is required"),
  body("orignalLink")
    .notEmpty()
    .isURL()
    .withMessage("Orignal Link is required"),

  registerUser
);
router.post(
  "/login",
  body("password").notEmpty().withMessage("Password is required"),
  body("username").notEmpty().withMessage("Username is required"),
  loginUser
);

router.post("/logout", LogoutUser);

export default router;
