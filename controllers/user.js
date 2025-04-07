
const User = require("../models/user.js");
const ExpressError  = require("../utils/ExpressError.js");

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password);
    //automatic login after signup
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Airbnb");
      res.redirect("/listing");
    });
  } catch (e) {
    if (e.code === 11000) {
      // MongoDB duplicate key error code
      req.flash("error", "Email or username already exists.");
    } else {
      req.flash("error", e.message);
    }
    res.redirect("/signup");
  }
};

module.exports.renderSignupform = (req, res) => {
  res.render("./user/signup.ejs");
};

module.exports.renderLoginfrom = (req, res) => {
  res.render("./user/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome to Airbnb");
  let redirectUrl = res.locals.redirectUrl || "/listing";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are successfully logged out");
    res.redirect("/listing");
  });
};
