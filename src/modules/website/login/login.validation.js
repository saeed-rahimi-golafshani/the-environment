const Joi = require("joi");
const AuthMessage = require("./login.message");
const createHttpError = require("http-errors");
const { MOBILE_PATTERN } = require("../../../common/utills/constrant");

const sendOtpSchema = Joi.object({
    user_code: Joi
        .string()
        .trim()
        .error(createHttpError.BadRequest(AuthMessage.codeValidation)),
    mobile: Joi.string()
        .trim()
        .length(11)
        .pattern(MOBILE_PATTERN)
        .error(createHttpError.Conflict(AuthMessage.mobileValidation)),
});
const checkOtpSchema = Joi.object({
    mobile: Joi
        .string()
        .trim()
        .length(11)
        .pattern(MOBILE_PATTERN)
        .error(createHttpError.BadRequest(AuthMessage.mobileValidation)),
    code: Joi
        .string()
        .trim()
        .min(4)
        .max(6)
        .error(createHttpError.BadRequest(AuthMessage.codeValidation)),
});

module.exports = {
    sendOtpSchema,
    checkOtpSchema
};
