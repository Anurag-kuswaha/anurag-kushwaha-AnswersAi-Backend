

const db = require('../sequelize/models')
const { v4: uuidv4, validate: uuidValidate } = require('uuid');
var _ = require('lodash');
const { askQuestionToAI } = require('./aiService.js')

const askQuestionService = async (email, question) => {
    try {
        // do third-party API call to get the question response
        const aiResponse = await askQuestionToAI(question);
        if (aiResponse.error) {
            return {
                statusCode: 400,
                response: { data: aiResponse, error: true }
            }
        }
        const userProfile = await db.users.findOne({ where: { email }, raw: true });
        console.log('user profile is ', userProfile);
        // store the results in our db.
        const questionId = uuidv4();
        await db.questions.create({
            id: questionId,
            content: question,
            result: aiResponse.response,
            user_id: userProfile.id
        })

        return {
            statusCode: 200,
            response: { questionId, data: aiResponse.response, error: false }
        }
    } catch (e) {
        console.log('eror occured', e);
        return {
            statusCode: 500,
            response: { error: true, msg: 'Internal Server Error' }
        }
    }
}

const getUserAskedQuestionListService = async (userId) => {
    try {
        if (!uuidValidate(userId)) {
            return {
                statusCode: 400,
                response: { msg: `wrong user id is provided`, error: true }
            }
        }
        const ListofQuestion = await db.questions.findAll({ where: { user_id: userId }, raw: true });

        return {
            statusCode: 200,
            response: { data: ListofQuestion, error: false }
        }
    } catch (e) {
        console.log('eror occured', e);
        return {
            statusCode: 500,
            response: { error: true, msg: 'Internal Server Error' }
        }
    }
}

const getAskedQuestionAnswerService = async (questionId) => {
    try {
        if (!uuidValidate(questionId)) {
            return {
                statusCode: 400,
                response: { msg: `wrong user id is provided`, error: true }
            }
        }
        const questionResponse = await db.questions.findOne({ where: { id: questionId }, raw: true });

        return {
            statusCode: 200,
            response: { data: questionResponse, error: false }
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
    askQuestionService,
    getUserAskedQuestionListService,
    getAskedQuestionAnswerService

}