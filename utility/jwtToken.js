const jwt = require("jsonwebtoken");

const jwtToken = (data, exp = 86400000) => {
  return jwt.sign({ data }, process.env.JWT_SECRATE, {
    expiresIn: exp,
  });
};

module.exports = { jwtToken };
