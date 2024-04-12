import express from "express";
import CookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ErrorHandler } from "./middlewares/errorMiddleware";
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ extended: true, max: "50mb" }));
app.use(express.urlencoded({ extended: true, max: "50mb" }));
app.use(CookieParser());
app.use(ErrorHandler());
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
