const { askQuestionService, getAskedQuestionAnswerService } = require('../services/questionService')

/**
 * @function to ask question from AI
 * @param {*} req 
 * @param {*} res 
 * @returns response
 */
const askQuestion = async (req, res) => {
    if (!req.body && !('question' in req.body)) {
        return res.status(400).send({ error: true, msg: 'question is missing' });
    }
    const { statusCode, response } = await askQuestionService(req.email, req.body.question);
    return res.status(statusCode).send(response);
}

/**
 * @function to retrive the asked question result from our database 
 * @param {*} req 
 * @param {*} res 
 * @returns respone
 */
const getAskedQuestionAnswer = async (req, res) => {
    const questionId = req.params.questionId;
    if (!questionId)
        return res.status(400).send({ error: true, msg: 'question id is missing' });
    const { statusCode, response } = await getAskedQuestionAnswerService(questionId);
    return res.status(statusCode).send(response);
}

module.exports = {
    askQuestion,
    getAskedQuestionAnswer
}