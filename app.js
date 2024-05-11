// app.js

const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const { logRequest } = require("./middleware/loggerMiddleware");
const BlogController = require("./controllers/blogController");
const flash = require("connect-flash");
const session = require("express-session");
const connectDB = require("./db/connection");
// Make sure to import middleware functions correctly

const app = express();

// Middleware
connectDB();
app.use(logRequest);

app.use(
  session({
    secret: "your_secret_here",
    resave: false,
    saveUninitialized: true,
  })
);


app.use(express.static("public"));

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(ejsLayouts);
// Routes
app.get("/", BlogController.getAllPublishedBlogs);
app.use("/users", userRoutes);
app.use("/blog", blogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
