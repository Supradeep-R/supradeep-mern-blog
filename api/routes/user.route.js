const express = require('express')
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

const {createPost}=require('../controllers/user.controller');

router.post('/create-post',authMiddleware,createPost)

module.exports=router;