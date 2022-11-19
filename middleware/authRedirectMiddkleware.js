const sessionRes = require("../utility/sessionRes");
const jwt = require("jsonwebtoken");

const authRedirectMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.AuthUser;

    if (!token) {
      sessionRes("You are Not Authorize", "/login", req, res);
    }

    if (token) {
      const userToken = jwt.verify(token, process.env.JWT_SECRATE);

      if (userToken) {
        next();
      } else {
        delete req.session.user;
        res.clearCookie("AuthUser");
        sessionRes("Invalid Token", "/login", req, res);
      }
    }
  } catch (error) {
    delete req.session.user;
    res.clearCookie("AuthUser");
    sessionRes("Invalid Token", "/login", req, res);
  }
};

// module exports
module.exports = authRedirectMiddleware;
