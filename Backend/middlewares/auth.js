// middlewares/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel"); // adjust path if needed

// ✅ Auth Middleware
const auth = async (req, res, next) => {
  try {
    // 1️⃣ Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authentication token missing" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>"

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret token");

    // 3️⃣ Find user in DB
    const user = await User.findById(decoded.user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 4️⃣ Attach user to request object
    req.user = user;

    next(); // pass control to next middleware or controller
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = auth;
