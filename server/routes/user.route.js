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
  "/register",
  body("email")
    .isEmail()
    .notEmpty()
    .withMessage("Email is not valid")
    .custom(async (value) => {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),
  body("password").notEmpty().withMessage("Password is required"),
  body("username").notEmpty().withMessage("Username is required"),
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
