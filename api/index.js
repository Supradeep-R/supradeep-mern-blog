const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(cors({ origin: "*" }));

// integrating database connection
const mongoDB = require("../api/db.js");
mongoDB();

// registering routes
const authRoutes = require("../api/routes/auth.route.js");
app.use("/api", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
