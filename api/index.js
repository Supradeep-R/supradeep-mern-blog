const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

// integrating database connection
const mongoDB = require('../api/db.js');
mongoDB();


app.listen(process.env.PORT,()=>{
    console.log(`Server listening at port ${process.env.PORT}`)
})
 