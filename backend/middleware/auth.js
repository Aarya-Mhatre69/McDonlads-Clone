const jwt = require("jsonwebtoken");

/**
 * Auth middleware — supports two strategies:
 * 1. Bearer JWT  — client sends Authorization: Bearer <token>
 * 2. Internal API key — Next.js server-to-server with x-api-key + x-user-id headers
 */
module.exports = function requireAuth(req, res, next) {
  // Internal Next.js → Express calls
  const apiKey = req.headers["x-api-key"];
  if (apiKey && apiKey === process.env.INTERNAL_API_KEY) {
    req.user = {
      id:    req.headers["x-user-id"]    || "internal",
      email: req.headers["x-user-email"] || "",
      name:  req.headers["x-user-name"]  || "",
    };
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Authorization token required." });
  }

  const token = authHeader.slice(7);
  try {
    const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET;
    const decoded = jwt.verify(token, secret);
    req.user = {
      id:    decoded.id  || decoded.sub,
      email: decoded.email || "",
      name:  decoded.name  || "",
    };
    next();
  } catch (err) {
    const message =
      err.name === "TokenExpiredError" ? "Token has expired. Please sign in again." :
      err.name === "JsonWebTokenError"  ? "Invalid token."                           :
      "Authentication failed.";
    res.status(401).json({ success: false, message });
  }
};
