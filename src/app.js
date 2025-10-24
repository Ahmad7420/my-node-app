import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import { ApiError } from "./utils/APIError.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", projectRoutes);

app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  res.status(statusCode).json({ statusCode, message });
});

export default app;
