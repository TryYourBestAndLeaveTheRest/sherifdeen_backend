// models/Blog.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    state: { type: String, enum: ["draft", "published"], default: "draft" },
    read_count: { type: Number, default: 0 },
    reading_time: { type: Number },
    tags: [{ type: String }],
    body: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
