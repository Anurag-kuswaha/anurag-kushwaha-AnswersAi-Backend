
/**
 * @name: question.js
 * @description: question route endpoints
 */

const router = require('express').Router();
const questionController = require('../controllers/questionController.js');
const { verifyToken } = require('../middlewares/auth');

// to retrive user details 
router.post("/", verifyToken, questionController.askQuestion);

// route to get list of asked question by the user
router.get("/:questionId", verifyToken, questionController.getAskedQuestionAnswer);

module.exports = router;
