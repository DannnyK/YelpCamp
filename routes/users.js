const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

//register
router.get("/register", async (req, res) => {
	res.render("./users/register");
});

router.post(
	"/register",
	catchAsync(async (req, res, next) => {
		try {
			const { email, username, password } = req.body;
			const user = new User({ email, username });
			const registeredUser = await User.register(user, password);
			req.login(registeredUser, (err) => {
				if (err) return next(err);
				req.flash("success", "Welcome to YelpCamp baby");
				res.redirect("/campgrounds");
			});
		} catch (e) {
			req.flash("error", e.message);
			res.redirect("register");
		}
	})
);
//end register

//login
router.get("/login", (req, res) => {
	res.render("users/login");
});

router.post(
	"/login",
	passport.authenticate("local", {
		failureFlash: true,
		failureRedirect: "/login",
		keepSessionInfo: true,
	}),
	(req, res) => {
		req.flash("success", "welcome back!");
		const redirectUrl = req.session.returnTo || "/campgrounds";
		delete req.session.returnTo;
		res.redirect(redirectUrl);
	}
);
//old code
// router.post(
// 	"/login",
// 	passport.authenticate("local", {
// 		failureFlash: true,
// 		failureRedirect: "/login",
// 		keepSessionInfo: true,
// 	}),
// 	(req, res) => {
// 		req.flash("success", "Welcome");
// 		const redirectUrl = req.session.returnTo || "/campgrounds";
// 		res.redirect(redirectUrl);
// 	}
// );

//end login

//logout
router.get("/logout", (req, res) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
	});
	req.flash("success", "successfully logged out");
	return res.redirect("/campgrounds");
});

module.exports = router;
