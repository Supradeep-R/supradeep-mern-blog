const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "https://supradeep-blog-app.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
// integrating database connection
const mongoDB = require("../api/db.js");
mongoDB();

// registering routes
const authRoutes = require("../api/routes/auth.route.js");
app.use("/api", authRoutes);
const userRoutes = require("../api/routes/user.route.js");
app.use("/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
