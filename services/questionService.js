

const db = require('../sequelize/models')
const { Op } = require('sequelize');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');
var _ = require('lodash');
const { askQuestionToAI } = require('./aiService.js');

const askQuestionService = async (email, question) => {
    try {
        // get user details
        const userProfile = await db.users.findOne({ where: { email }, raw: true });
        console.log('user profile is ', userProfile);

        // check answer exists in our db or not
        const existQuestionResponse = await db.questions.findOne({
            where: {
                content: question
            },
            raw: true
        })
        if (existQuestionResponse) {
            // update our question table database with the new user who asked the same question

            console.log('existQuestionResponse is', existQuestionResponse);
            const userQuestionMapping = await db.userquestionmappings.findOne({ where: { user_id: userProfile.id, question_id: existQuestionResponse.id } })

            if (!userQuestionMapping) {
                await db.userquestionmappings.create({
                    user_id: userProfile.id, question_id: existQuestionResponse.id
                })
            }
            return ({
                statusCode: 200,
                response: { questionId: existQuestionResponse.id, data: existQuestionResponse.result, error: false }
            })
        }
        // do third-party API call to get the question response
        const aiResponse = await askQuestionToAI(question);
        if (aiResponse.error) {
            return {
                statusCode: 400,
                response: { data: aiResponse, error: true }
            }
        }

        // store the results in our db.
        const questionId = uuidv4();
        await db.questions.create({
            id: questionId,
            content: question,
            result: aiResponse.response,
            user_ids: [userProfile.id]
        })
        await db.userquestionmappings.create({
            user_id: userProfile.id, question_id: questionId
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
        const ListofQuestion = await db.questions.findAll({
            include: [{
                model: db.userquestionmappings,
                where: { user_id: userId },
                attributes: [],
            }]
        })
        console.log('ListofQuestion is ', ListofQuestion);

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