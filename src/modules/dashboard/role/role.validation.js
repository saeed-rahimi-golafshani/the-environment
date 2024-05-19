const createHttpError = require("http-errors");
const joi = require("joi");
const roleMessage = require("./role.message");

const createRoleSchema = joi.object({
    code: joi
        .string()
        .required()
        .error(createHttpError.Conflict(roleMessage.mistekId)),
    title: joi
        .string()
        .required()
        .trim()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(roleMessage.mistekTitle)),
    slug: joi
        .string()
        .trim()
        .required()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(roleMessage.mistekSlug)),
    description: joi
        .string()
        .trim()
        .required()
        .error(createHttpError.Conflict(roleMessage.mistekDescription)),
    content: joi
        .string()
        .trim()
        .required()
        .error(createHttpError.Conflict(roleMessage.mistekContent)),
    status: joi
        .boolean()
        .error(createHttpError.Conflict(roleMessage.mistekStatus)),
});

module.exports = {
    createRoleSchema,
};
