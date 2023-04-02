exports.getLogin = (req, res, next) => {
  const LoggedIn =
    req.get("Cookie")?.split(";")[0]?.trim()?.split("=")[1] === "true";
  console.log(req.get("Cookie"));
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: LoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
