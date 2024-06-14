

const { ChatAnthropic } = require("@langchain/anthropic");
const model = new ChatAnthropic({
    temperature: 0.9,
    model: "claude-3-sonnet-20240229",
    apiKey: process.env.ANTHROPIC_API_KEY,
    maxTokens: 1024,
});

const askQuestionToAI = async (question) => {
    try {
        console.log('asked question is ', question);
        const res = await model.invoke(question);
        console.log(res);
        return {
            error: false,
            response: { data: res }
        }
    } catch (e) {
        console.log('error in ai service call ', e);
        return {
            error: true,
            response: { msg: 'Internal Server Error' }
        }
    }
}

module.exports = {
    askQuestionToAI
}