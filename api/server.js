import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import CookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./Routes/auth.routes.js";
dotenv.config();
// Create Express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(CookieParser());
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define a sample route
app.get("/", (req, res) => {
  console.log(req.cookies.token);
  res.cookie("token", "my");
  res.send("Hello, World!");
});
app.use("/api/auth", authRoutes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
