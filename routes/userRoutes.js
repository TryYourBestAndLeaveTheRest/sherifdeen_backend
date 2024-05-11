// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// User sign-up page
router.get("/signup", (req, res) => {
  res.render("signup", { layout: "layouts/blank.ejs", title: "Signup" });
});
// User sign-up route
router.post("/signup", UserController.signUp);

// User sign-in page
router.get("/signin", (req, res) => {
  res.render("signin", { layout: "layouts/blank.ejs", title: "SignIn" });
});
// User sign-in route
router.post("/signin", UserController.signIn);

router.get("/dashboard", (req, res) => {
  res.render("dashboard", { layout: "layouts/layout.ejs", user });
});
module.exports = router;
