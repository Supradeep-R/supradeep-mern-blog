const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
app.use(express.json());

// integrating database connection
const mongoDB = require('../api/db.js');
mongoDB();

// registering routes
const authRoutes = require('../api/routes/auth.route.js');
app.use('/api',authRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server listening at port ${process.env.PORT}`)
})
 