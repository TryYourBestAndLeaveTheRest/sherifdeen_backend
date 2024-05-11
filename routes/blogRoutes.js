// routes/blogRoutes.js

const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/blogController");
const {
  authenticateUser,
  authorizeAdmin,
} = require("../middleware/authMiddleware");

// Get a published blog
router.get("/blogs/:id", BlogController.getPublishedBlog);

router.get("/addblog", (req, res) => {
  res.render("addblog", { layout: "./layouts/layout.ejs" });
});
// Create a blog
router.post("/", authenticateUser, BlogController.createBlog);

// Update blog state to published
router.put(
  "/blogs/:id/publish",
  authenticateUser,
  authorizeAdmin,
  BlogController.publishBlog
);

// Edit a blog
router.put("/blogs/:id", authenticateUser, BlogController.editBlog);

// Delete a blog
router.delete("/blogs/:id", authenticateUser, BlogController.deleteBlog);

// Get list of user's blogs
router.get("/user/blogs", authenticateUser, BlogController.getUserBlogs);

// Get a single blog
router.get("/user/blogs/:id", BlogController.getSingleUserBlog);

module.exports = router;
