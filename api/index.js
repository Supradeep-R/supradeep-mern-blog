const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path"); // Import path module

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://supradeep-mern-blog.vercel.app", "http://localhost:5173"], // Allow both production and local
    credentials: true,
  })
);

// Integrating database connection
const mongoDB = require("../api/db.js");
mongoDB();

// Registering routes
const authRoutes = require("../api/routes/auth.route.js");
app.use("/api", authRoutes);
const userRoutes = require("../api/routes/user.route.js");
app.use("/user", userRoutes);

// Serve static files from the frontend build directory (if applicable)
app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Adjust this if your build output is in a different folder

// Catch-all handler for any requests that don't match above
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html")); // Adjust this path as necessary
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
