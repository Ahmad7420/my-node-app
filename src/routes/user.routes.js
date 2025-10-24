import express from "express";
import { loginSchema, signupSchema } from "../validations/user.validations.js";
import { signin, signup } from "../controllers/user.controller.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/register", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), signin);

export default router;
