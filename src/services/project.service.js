import Projects from "../models/project.model.js";
import { ApiError } from "../utils/APIError.js";

export const createProjectService = async (projectPayload) => {
  try {
    const project = await Projects.create(projectPayload);
    return await project.save();
  } catch (err) {
    throw new ApiError(`createProject failed: ${err.message}`);
  }
};

export const getAllProjectService = async () => {
  try {
    const projects = await Projects.find();
    return projects;
  } catch (err) {
    throw new ApiError(`getAllProject failed: ${err.message}`);
  }
};
