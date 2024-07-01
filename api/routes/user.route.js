const express = require('express')
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

const {createPost,viewPosts , viewSinglePost,updateSinglePost}=require('../controllers/user.controller');

router.post('/create-post',authMiddleware,createPost)
router.get('/view-posts',authMiddleware,viewPosts)
router.get('/view-single-post/:id',authMiddleware,viewSinglePost)
router.put('/update-single-post/:id',authMiddleware,updateSinglePost)

module.exports=router;