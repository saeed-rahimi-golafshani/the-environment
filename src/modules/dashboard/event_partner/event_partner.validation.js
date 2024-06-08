const createHttpError = require("http-errors");
const joi = require("joi");
const {
    FILENMAE_IMAGE_PATTERN,
    MOBILE_PATTERN,
    PHONE_PATTERN,
} = require("../../../common/utills/constrant");
const eventPartnerMessage = require("./event_partner.message");

const createEventPartnerSchema = joi.object({
    code: joi
        .string()
        .required()
        .error(createHttpError.Conflict(eventPartnerMessage.mistekId)),
    title: joi
        .string()
        .required()
        .trim()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(eventPartnerMessage.mistekTitle)),
    slug: joi
        .string()
        .trim()
        .required()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(eventPartnerMessage.mistekSlug)),
    description: joi
        .string()
        .trim()
        .error(createHttpError.Conflict(eventPartnerMessage.mistekText)),
    phone: joi
        .string()
        .allow('', null)
        .pattern(PHONE_PATTERN),
    mobile: joi
        .string()
        .allow('', null)
        .length(11)
        .pattern(MOBILE_PATTERN),
    status: joi
        .boolean()
        .error(createHttpError.Conflict(eventPartnerMessage.mistekPublishedStatus)),
    filename: joi
        .string()
        .pattern(FILENMAE_IMAGE_PATTERN)
        .error(createHttpError.Conflict(eventPartnerMessage.mistekFileName)),
    fileUploadPath: joi.allow(),
});

module.exports = {
    createEventPartnerSchema
};
