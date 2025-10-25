import {
  createProjectService,
  getAllProjectService,
} from "../services/project.service.js";
import s3 from "../config/s3.js";
import { getPreSignedUrl } from "../utils/s3.helper.js";

export const getAllProject = async (req, res) => {
  try {
    const projects = await getAllProjectService();
    return res.status(200).json({
      message: "Projects retrieved successfully",
      data: projects,
    });
  } catch (err) {
    console.error("Get all projects error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, description, number } = req.body || {};
    if (!req.file)
      return res.status(400).json({ error: "Thumbnail image is required" });

    const uploadParams = {
      Bucket: process.env.IDRIVE_BUCKET,
      Key: `uploads/${Date.now()}-${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: "public-read",
    };

    await s3.upload(uploadParams).promise();
    const signedUrl = await getPreSignedUrl(uploadParams);

    const projectPayload = {
      name,
      description,
      number,
      thumbnailUrl: signedUrl,
    };
    const newProject = await createProjectService(projectPayload);
    return res.status(201).json({
      message: "Project created successfully",
      data: newProject,
    });
  } catch (err) {
    console.error("Create project error", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};
