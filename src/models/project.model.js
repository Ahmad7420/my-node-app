import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    number: { type: String, required: true, unique: true },
    thumbnailUrl: { type: String, required: false },
  },
  { timestamps: true }
);

const Projects = mongoose.model("Projects", projectSchema);
export default Projects;
