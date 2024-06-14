/**
 * @name: router.js
 * @description: defined all the endpoints (URIs) respond to client requests
 */

const router = require("express").Router();
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");
const questionRoute = require("./routes/question.js");

// route for auth, login, logout or refresh token  
router.use("/auth", authRoute);

// route for account level details 
router.use("/users", userRoute);

// route for auth, login, logout or refresh token  
router.use("/questions", questionRoute);

router.use("/healthcheck", (req, res) => {
  res.status(200).send("Server is up and running!");
});

module.exports = router;