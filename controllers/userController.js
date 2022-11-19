// require module
const User = require("../models/User");
const hashPassword = require("../utility/hashPassword");
const sessionRes = require("../utility/sessionRes");
const bcrypt = require("bcryptjs");
const { jwtToken } = require("../utility/jwtToken");
const jwt = require("jsonwebtoken");
const sendMail = require("../utility/sendMale");

/**
 * @desc User dashBoard page
 * @name DASHBORD ROUTE
 * @access  PUBLIC
 */
const dashBoard = (req, res) => {
  res.render("index");
};

/**
 * @desc User Register page
 * @name /user/login
 * @access PUBLIC
 */
const registerPage = (req, res) => {
  res.render("register");
};

/**
 * @desc User Login page
 * @name /user/login
 * @access PUBLIC
 */
const loginPage = (req, res) => {
  res.render("login");
};

///////////////////////////

/**
 * @desc User Register
 * @name POST /register
 * @access PUBLIC
 */
const registerUser = async (req, res) => {
  // Get register from data
  const { name, email, password } = req.body;

  // Eror handaling
  try {
    if (!name || !email || !password) {
      sessionRes("All felds are requiresd.. 😅😅😅", "/register", req, res);
    }

    // Email Chake
    const isEmail = await User.find().where("email").equals(email);

    // Is email exsist
    if (isEmail.length > 0) {
      sessionRes("This email allready exist..", "/register", req, res);
    }

    if (isEmail.length == 0) {
      // Data Store
      const userData = await User.create({
        name,
        email,
        password: hashPassword(password),
      });

      // create token
      const token = jwtToken({ id: userData._id });

      // Activation LInk
      const activationLink = `${process.env.APP_URL}:${process.env.PORT}/acountActivation/${token}`;

      // Send Mail
      sendMail(email, "Register Successfull", {
        name: name,
        link: activationLink,
      });

      sessionRes("Acount Create SuccessFull 😃😃😃", "/login", req, res);
    }
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * @desc User Login
 * @name POST /liginUser
 * @access PUBLIC
 */
const loginUser = async (req, res) => {
  // Get Login from data
  const { email, password } = req.body;

  // Error handaling
  try {
    // chake email or pass emty
    if (!email || !password) {
      sessionRes("All felds are requiresd.. 😅😅😅", "/login", req, res);
    } else {
      // User Email Chake
      const isUser = await User.findOne({ email });

      // Email not exeist
      if (!isUser) {
        sessionRes("Email not Exiset 😅😅😅", "/login", req, res);
      }

      if (isUser) {
        if (!isUser.isActivate) {
          sessionRes("Active your acount", "/login", req, res);
        } else {
          // Password Chake
          const isPassword = await bcrypt.compare(password, isUser.password);

          if (!isPassword) {
            sessionRes("Password Not Match 😅", "/login", req, res);
          } else {
            // jwt token
            const token = jwtToken(
              { id: isUser._id },
              1000 * 60 * 60 * 24 * 20
            );

            const user = await User.findById(isUser._id);

            // Respons
            res.cookie("AuthUser", token);
            req.session.user = user;
            sessionRes("User Login SuccessFull", "/", req, res);
          }
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }

  // Password match our current Password
};

/**
 * @desc User Logout
 * @name Get /logOut
 * @access PUBLIC
 */
const logoutUser = (req, res) => {
  // Delete session and cookie
  delete req.session.user;
  res.clearCookie("AuthUser");

  sessionRes("User LogOut Successfull", "/login", req, res);
};

/**
 * @desc User activateAcount
 * @name Get /activateAcount
 * @access PUBLIC
 */
const activateAcount = async (req, res) => {
  try {
    // Get token parems
    const { token } = req.params;

    // Verify token
    const tokenVerify = jwt.verify(token, process.env.JWT_SECRATE);

    if (!tokenVerify) {
      // verify mcg
      sessionRes("Invalid activition Link", "/login", req, res);
    } else {
      // get activate user
      const activateuser = await User.findById(tokenVerify.id);

      if (activateuser.isActivate == true) {
        // verify mcg
        sessionRes("Acount allredy activate", "/login", req, res);
      } else {
        // Update isActivate value
        await User.findByIdAndUpdate(activateuser._id, {
          isActivate: true,
        });

        //Verify mcg
        sessionRes("Acount Activate,Login now", "/login", req, res);
      }
    }
  } catch (error) {
    sessionRes("Sorry bro", "/login", req, res);
  }
};

// module export
module.exports = {
  dashBoard,
  registerPage,
  loginPage,
  logoutUser,

  registerUser,
  loginUser,

  activateAcount,
};
