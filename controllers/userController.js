const { signupUserService, getUserDetailsService } = require('../services/userService.js');
const {getUserAskedQuestionListService} =  require('../services/questionService.js');

/**
 * @function createAccount to create user account
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createAccount = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ error: true, msg: 'data is missing' });
    }
    const { statusCode, response } = await signupUserService(req.body);
    return res.status(statusCode).send(response);
}

/**
 * @function getUserDetails to get user details by user id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getUserDetails = async (req, res) => {
    const userId = req.params.userId;
    if (!userId)
        return res.status(400).send({ error: true, msg: 'userId id is missing' });
    const { statusCode, response } = await getUserDetailsService(userId);
    return res.status(statusCode).send(response);
}

/**
 * @function getUserQuestionList to get list of question  asked by user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getUserQuestionList = async (req, res) => {
    const userId = req.params.userId;
    if (!userId)
        return res.status(400).send({ error: true, msg: 'userId id is missing' });
    const { statusCode, response } = await getUserAskedQuestionListService(userId);
    return res.status(statusCode).send(response);
}


module.exports = {
    createAccount,
    getUserDetails,
    getUserQuestionList
}