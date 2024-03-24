import express from "express";
import { Login, SignUp } from "../Controllers/auth.controller.js";
const router = express.Router();

router.get("/signup", SignUp);
router.get("/signin", Login);

export default route;
