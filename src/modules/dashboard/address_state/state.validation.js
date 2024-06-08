const joi = require("joi");
const stateMessage = require("./state.message");
const createHttpError = require("http-errors");

const createStateSchema = joi.object({
    code: joi
        .string()
        .required()
        .error(createHttpError.Conflict(stateMessage.mistekId)),
    stateName: joi
        .string()
        .required()
        .trim()
        .min(2)
        .max(100)
        .error(createHttpError.Conflict(stateMessage.mistekStateName)),
})

module.exports = {
    createStateSchema
}