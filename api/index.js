const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// integrating database connection
const mongoDB = require("../api/db.js");
mongoDB();

// registering routes
const authRoutes = require("../api/routes/auth.route.js");
app.use("/api", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
