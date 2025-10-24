import express from "express";
import {
  createProject,
  getAllProject,
} from "../controllers/project.controller.js";
import { projectCreationSchema } from "../validations/project.validation.js";
import { validate } from "../middleware/validate.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/project",
  upload.single("thumbnail"),
  validate(projectCreationSchema),
  createProject
);
router.get("/project", getAllProject);

export default router;
