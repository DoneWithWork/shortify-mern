import express from "express";
import CookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import linkRoutes from "./routes/link.route.js";
import userRoutes from "./routes/user.route.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
console.log(PORT);
const MONGO_URI = process.env.MONGO_URI;
const app = express();
console.log("MONGO_URI:", MONGO_URI); // Log MONGO_URI to check if it's defined

app.use(helmet());
app.use(cors());
app.use(express.json({ extended: true, max: "50mb" }));
app.use(express.urlencoded({ extended: true, max: "50mb" }));
app.use(CookieParser());

app.use("/auth", userRoutes);
app.use("/links", linkRoutes);

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
