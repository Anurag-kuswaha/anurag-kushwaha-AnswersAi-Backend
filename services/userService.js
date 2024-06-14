
const db = require('../sequelize/models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');
var _ = require('lodash');
const schemaUtils = require('../Utils/validateSchema.js')

const getUserDetailsService = async (userId) => {
    try {
        if (!uuidValidate(userId)) {
            return {
                statusCode: 400,
                response: { msg: `wrong user id is provided`, error: true }
            }
        }
        const dbData = await db.users.findByPk(userId);
        console.log('dbData is', dbData);
        if (!dbData) {
            return {
                statusCode: 400,
                response: { msg: `No User found with this userid ${userId} `, error: true }
            }
        }
        const data = _.pick(dbData.dataValues, [
            'id', 'name', 'email', 'createdAt', 'updatedAt', 'password'
        ], {})
        return {
            statusCode: 200,
            response: {
                data, error: false
            }
        }
    }
    catch (e) {
        console.log('eror occured', e);
        return {
            statusCode: 500,
            response: { error: true, msg: 'Internal Server Error' }
        }
    }
}

const signupUserService = async (body) => {
    try {
        console.log('body is ', body);
        const { error } = schemaUtils.ValidateUserSchema({ ...body });
        if (error) {
            return { response: { msg: error.details[0].message, error: true }, statusCode: 400 };
        }
        const { email, name, password } = body;
        // check account exist or not.
        const dbData = await db.users.findOne({ where: { email } });
        if (dbData) {
            return {
                statusCode: 200,
                response: { msg: `Account already exist, please try logging in`, error: true }
            }

        }
        const hashPassword = await bcrypt.hash(password, 10);
        console.log('bcrypt pwd is ', hashPassword)
        const dbResponse = await db.users.create({
            id: uuidv4(), email, name, password: hashPassword
        });
        return {
            statusCode: 201,
            response: { msg: 'Account created successfully', error: false, id: dbResponse.dataValues.id, email: dbResponse.dataValues.email, name: dbResponse.dataValues.name }
        }

    }
    catch (e) {
        console.log('eror occured', e);
        return {
            statusCode: 500,
            response: { error: true, msg: 'Internal Server Error' }
        }
    }
}

const loginUserService = async (body) => {
    try {
        console.log('body is ', body);
        const { error } = schemaUtils.ValidateLoginSchema({ ...body });
        if (error) {
            return { response: { msg: error.details[0].message, error: true }, statusCode: 400 };
        }
        const { email, password } = body;
        const dbData = await db.users.findOne({ where: { email } });
        if (!dbData) {
            return {
                statusCode: 200,
                response: { msg: `Account doesn't exist, please try create one`, error: true }
            }
        }
        // authenciate password
        const isAuthTrue = await bcrypt.compare(password, dbData.dataValues.password);
        console.log('isAuthTrue is ', isAuthTrue);
        if (dbData && isAuthTrue) {
            // password is correct, send jwt token to the client
            const token = jwt.sign({ id: dbData.dataValues.id, email: dbData.dataValues.email }, 'ANSWERAI-SECRET', { expiresIn: '5m' });
            return {
                statusCode: 200,
                response: { token, msg: 'Logged In successfully', error: false, id: dbData.dataValues.id, email: dbData.dataValues.email, name: dbData.dataValues.name }
            }
        } else {
            return {
                statusCode: 400,
                response: { msg: 'Wrong Password', error: true }
            }
        }
    } catch (e) {
        console.log('eror occured', e);
        return {
            statusCode: 500,
            response: { error: true, msg: 'Internal Server Error' }
        }
    }
}
const generateRefreshToken = async (body) => {
    try {
        const { error } = schemaUtils.ValidateLoginSchema({ ...body });
        if (error) {
            return { response: { msg: error.details[0].message, error: true }, statusCode: 400 };
        }
        const { email, password } = body;
        const dbData = await db.users.findOne({ where: { email } });
        if (!dbData) {
            return {
                statusCode: 200,
                response: { msg: `Account doesn't exist, please try create one`, error: true }
            }
        }
        // authenciate password
        const isAuthTrue = await bcrypt.compare(password, dbData.dataValues.password);
        console.log('isAuthTrue is ', isAuthTrue);
        if (dbData && isAuthTrue) {
            // password is correct, send jwt token to the client
            const token = jwt.sign({ id: dbData.dataValues.id, email: dbData.dataValues.email }, 'ANSWERAI-SECRET', { expiresIn: '5m' });
            return {
                statusCode: 200,
                response: { token, msg: 'Token generated successfully', error: false, id: dbData.dataValues.id, email: dbData.dataValues.email, name: dbData.dataValues.name }
            }
        } else {
            return {
                statusCode: 400,
                response: { msg: 'Wrong Password', error: true }
            }
        }
    } catch (e) {
        console.log('eror occured', e);
        return {
            statusCode: 500,
            response: { error: true, msg: 'Internal Server Error' }
        }
    }
}
module.exports = {
    signupUserService,
    loginUserService,
    getUserDetailsService,
    generateRefreshToken
}