const theUsername = "vivek";
const thePassword = "Admin123#";

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (
      !username ||
      !password ||
      username !== theUsername ||
      password !== thePassword
    ) {
      return res.redirect("/auth/login");
    }
    req.session.admin = true;
    res.redirect("/");
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error,
    });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
};

exports.loginForm = (req, res) => {
  res.render("login");
};
