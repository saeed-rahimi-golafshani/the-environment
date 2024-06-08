const createHttpError = require("http-errors");
const joi = require("joi");
const eventStatusMessage = require("./event_status.message");

const createEventStatusSchema = joi.object({
    code: joi
        .string()
        .required()
        .error(createHttpError.Conflict(eventStatusMessage.mistekId)),
    title: joi
        .string()
        .required()
        .trim()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(eventStatusMessage.mistekTitle))
});

module.exports = {
    createEventStatusSchema
};
