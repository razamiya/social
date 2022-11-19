const express = require("express");
const {
  dashBoard,
  registerPage,
  loginPage,
  registerUser,
  loginUser,
  logoutUser,
  activateAcount,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const authRedirectMiddleware = require("../middleware/authRedirectMiddkleware");

// Express Router
const router = express.Router();

// Routing
router.get("/", authRedirectMiddleware, dashBoard);
router.get("/register", authMiddleware, registerPage);
router.get("/login", authMiddleware, loginPage);

router.post("/register", registerUser);
router.post("/login", loginUser);

// router.get('/me', loogedInUser);
router.get("/logOut", logoutUser);
router.get("/acountActivation/:token", activateAcount);

// module export
module.exports = router;
