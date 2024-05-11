// controllers/blogController.js

const Blog = require("../models/blogModel");

exports.getAllPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ state: "published" }).sort({
      timestamp: -1,
    });
    res.render("index", {layout:'layouts/layout.ejs', title: "Home", blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getPublishedBlog = async (req, res) => {
  // Logic to get a published blog
};

// Define other controller functions here
// controllers/blogController.js

exports.getPublishedBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.state !== "published") {
      return res
        .status(404)
        .json({ message: "Blog not found or not published" });
    }

    // Increment read count
    blog.read_count += 1;
    await blog.save();

    res.render("blog", { title: blog.title, blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, description, tags, body } = req.body;

    const blog = new Blog({
      title,
      description,
      author: req.user._id,
      tags,
      body,
    });

    await blog.save();

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.publishBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.state = "published";
    await blog.save();

    res.status(200).json({ message: "Blog published successfully", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editBlog = async (req, res) => {
  try {
    const { title, description, tags, body } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.title = title;
    blog.description = description;
    blog.tags = tags;
    blog.body = body;

    await blog.save();

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.remove();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.remove();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id }).sort({
      timestamp: -1,
    });
    res.render("user-blogs", { title: "Your Blogs", blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSingleUserBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.author.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.render("blog", { title: blog.title, blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
