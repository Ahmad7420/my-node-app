import User from "../models/user.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/APIError.js";

export const getUserById = async (id) => {
  try {
    return await User.findById(id).lean();
  } catch (err) {
    throw new Error(`getUserById failed: ${err.message}`);
  }
};

export const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ email: username });

    if (!user || !user.password) {
      throw new ApiError(404, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(404, "Invalid credentials");
    }

    delete user.password;

    const payload = {
      sub: user._id,
      email: user.email,
    };

    const secret = process.env.JWT_SECRET || "change_this_secret";
    const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

    const token = jwt.sign(payload, secret, { expiresIn });

    return { token, user };
  } catch (err) {
    throw new Error(`login failed: ${err.message}`);
  }
};

export const registerUser = async (userData) => {
  try {
    const created = await User.create(userData);
    console.log("User registered:", created);
    return created;
  } catch (err) {
    throw new Error(`createUser failed: ${err.message}`);
  }
};
