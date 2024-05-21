const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN } = require("../../../common/utills/constrant");
const operatorMessage = require("./role_user.message");

const operatorSchema = joi.object({
    code: joi
        .string()
        .required()
        .error(createHttpError.Conflict(operatorMessage.mistekId)),
    role_id: joi
        .string()
        .trim()
        .required()
        .pattern(MONGOID_PATTERN)
        .error(createHttpError.Conflict(operatorMessage.mistekRoleId)),
    user_id: joi
        .string()
        .trim()
        .required()
        .pattern(MONGOID_PATTERN)
        .error(createHttpError.Conflict(operatorMessage.mistekUserId)),
    status: joi
        .boolean()
        .error(createHttpError.Conflict(operatorMessage.mistekStatus))
});

module.exports = {
    operatorSchema
};
