/**
 * @name: auth.js
 * @description: auth route endpoints
 */

const router = require('express').Router();
const authController = require('../controllers/authController.js');
const { verifyToken } = require('../middlewares/auth.js');

// to check the jwt token working or not
router.get('/', function (req, res) {
  res.json({ msg: 'Congrats! Your Token is valid' });
});

// handle user login
router.post('/login', authController.loginUser);

// handle logout
router.post('/logout',verifyToken, authController.logoutUser);

// handle token refresh
router.post('/refresh', authController.refreshToken);


module.exports = router;
