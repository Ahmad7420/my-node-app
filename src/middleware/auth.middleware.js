import jwt from "jsonwebtoken";
const { getUserById } = require("../services/user.service");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (!payload || !payload.sub) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await getUserById(payload.sub);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    req.tokenPayload = payload;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authenticate;
