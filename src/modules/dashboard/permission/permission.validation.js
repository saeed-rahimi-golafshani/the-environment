const createHttpError = require("http-errors");
const joi = require("joi");
const permissionMessage = require("./permission.message");

const permissionRoleSchema = joi.object({
    code: joi
        .string()
        .required()
        .error(createHttpError.Conflict(permissionMessage.mistekId)),
    title: joi
        .string()
        .required()
        .trim()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(permissionMessage.mistekTitle)),
    slug: joi
        .string()
        .trim()
        .required()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(permissionMessage.mistekSlug)),
    description: joi
        .string()
        .trim()
        .required()
        .error(createHttpError.Conflict(permissionMessage.mistekDescription)),
    content: joi
        .string()
        .trim()
        .required()
        .error(createHttpError.Conflict(permissionMessage.mistekContent)),
    status: joi
        .boolean()
        .error(createHttpError.Conflict(permissionMessage.mistekStatus)),
});

module.exports = {
    permissionRoleSchema
};
