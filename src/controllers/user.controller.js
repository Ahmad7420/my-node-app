import { loginUser, registerUser } from "../services/user.service.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    const createUserResponse = await registerUser({ name, email, password });
    return res.status(201).json({
      message: "User registered successfully",
      data: createUserResponse,
    });
  } catch (err) {
    console.error("Signup error", err);
    return res.status(400).json({ message: "Internal server error." });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!password || !username) {
      return res.status(400).json({
        message: "Missing credentials: provide username or email and password.",
      });
    }

    const signinResponse = await loginUser(username.toLowerCase(), password);

    return res.status(200).json({
      message: "User signed in successfully",
      data: signinResponse,
    });
  } catch (err) {
    console.error("Signin error", err);
    return res.status(404).json({
      message: err.message || "Internal server error.",
    });
  }
};
