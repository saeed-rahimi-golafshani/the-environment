const Joi = require("joi");
const { MOBILE_PATTERN } = require("../../../common/utills/constrant");
const AuthMessage = require("./auth.message");
const createHttpError = require("http-errors");

const sendOtpSchema = Joi.object({
    mobile: Joi
    .string()
    .trim()
    .length(11)
    .pattern(MOBILE_PATTERN)
    .error(createHttpError.Conflict(AuthMessage.mobileValidation))
});

module.exports = {
    sendOtpSchema
}
