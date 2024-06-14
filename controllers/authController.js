const { loginUserService, generateRefreshToken } = require('../services/userService')

/**
 * @function loginUser to login user account and generate token
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const loginUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ error: true, msg: 'data is missing' });
    }
    const { statusCode, response } = await loginUserService(req.body);
    return res.status(statusCode).send(response);
}

/**
 * @function logoutUser to logout user account.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const logoutUser = async (req, res) => {
    const { statusCode, response } = { statusCode: 200, response: { msg: 'delete jwt token from client side to logout the user' } };
    return res.status(statusCode).send(response);
}

/**
 * @function refreshToken to regenerate token 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const refreshToken = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ error: true, msg: 'email or password is missing' });
    }
    const { statusCode, response } = await generateRefreshToken(req.body);
    return res.status(statusCode).send(response);
}

module.exports = {
    loginUser,
    logoutUser,
    refreshToken
}