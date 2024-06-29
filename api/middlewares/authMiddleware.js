const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: No token provided" });
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Authentication failed: Invalid token" });
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user; 
      console.log("auth middle ware is called and user is :"+req.user);
      // Attach user object to request
      next(); // Pass control to the next middleware
    } catch (error) {
      console.error("Error authenticating token:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
};

module.exports = authenticateToken;
