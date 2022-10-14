const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const users = require("../controllers/users");

//register
router
	.route("/register")
	.get(users.renderRegisterForm)
	.post(catchAsync(users.registerUser));

//end register

//login
router
	.route("/login")
	.get(users.renderLoginForm)
	.post(
		passport.authenticate("local", {
			failureFlash: true,
			failureRedirect: "/login",
			keepSessionInfo: true,
		}),
		users.loginUser
	);

//logout
router.get("/logout", users.logoutUser);

module.exports = router;
