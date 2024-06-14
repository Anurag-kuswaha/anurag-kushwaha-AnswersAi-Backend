
/**
 * @name: user.js
 * @description: user route endpoints
 */

const router = require('express').Router();
const userController = require('../controllers/userController.js');
const { verifyToken } = require('../middlewares/auth');

// create user account
router.post("/", userController.createAccount);

// to retrive user details 
router.get("/:userId", verifyToken, userController.getUserDetails);


// route to get list of asked question by the user
router.get("/:userId/questions", verifyToken, userController.getUserQuestionList);

module.exports = router;
