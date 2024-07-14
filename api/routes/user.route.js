const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  createPost,
  viewPosts,
  viewSinglePost,
  updateSinglePost,
  viewAuthorPosts,
  deletePost,
} = require("../controllers/user.controller");

router.post("/create-post", authMiddleware, createPost);
router.get("/view-posts", authMiddleware, viewPosts);
router.get("/view-single-post/:id", authMiddleware, viewSinglePost);
router.put("/update-single-post/:id", authMiddleware, updateSinglePost);
router.get("/view-author-posts/:id", authMiddleware, viewAuthorPosts);
router.delete("/delete-post/:id", authMiddleware, deletePost);

module.exports = router;
