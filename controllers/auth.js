exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.LoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  req.LoggedIn = true;
  res.redirect("/");
};
