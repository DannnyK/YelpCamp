const User = require("../models/user");
//register
module.exports.renderRegisterForm = async (req, res) => {
	res.render("./users/register");
};

module.exports.registerUser = async (req, res, next) => {
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
};
//end register

module.exports.renderLoginForm = (req, res) => {
	res.render("users/login");
};

module.exports.loginUser = (req, res) => {
	req.flash("success", "welcome back!");
	const redirectUrl = req.session.returnTo || "/campgrounds";
	delete req.session.returnTo;
	res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
	});
	req.flash("success", "successfully logged out");
	return res.redirect("/campgrounds");
};
