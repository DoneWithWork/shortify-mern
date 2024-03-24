import express from "express";
import {
  CreateLink,
  RedirectToLink,
  DeleteLink,
  UpdateLink,
} from "../Controllers/link.controller";
const router = express.Router();

router.get("/createlink", SignUp);

export default router;
