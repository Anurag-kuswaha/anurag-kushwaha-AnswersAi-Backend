
const Joi = require("joi");
/**
 *@function ValidateUserSchema: used for validation of the user Registration Schema
 */
const ValidateUserSchema = (user) => {
    const userSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name: Joi.string().min(3).max(25).required(),
    });
    return userSchema.validate(user);

};

/**
 *@function ValidateLoginSchema: used for validation of the user loggedin schema
 */
const ValidateLoginSchema = (user) => {
    const LoginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return LoginSchema.validate(user);
};

module.exports = {
    ValidateUserSchema,
    ValidateLoginSchema,
}