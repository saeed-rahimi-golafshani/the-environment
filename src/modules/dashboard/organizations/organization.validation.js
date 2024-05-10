const createHttpError = require("http-errors");
const joi = require("joi");
const OrganizationMessage = require("./organization.message");
const {
    MONGOID_PATTERN,
    FILENMAE_IMAGE_PATTERN,
} = require("../../../common/utills/constrant");

const createOrganizationSchema = joi.object({
    code: joi
        .string()
        .required()
        .error(createHttpError.Conflict(OrganizationMessage.mistekId)),
    title: joi
        .string()
        .required()
        .trim()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(OrganizationMessage.mistekTitle)),
    slug: joi
        .string()
        .trim()
        .required()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(OrganizationMessage.mistekSlug)),
    description: joi
        .string()
        .trim()
        .required()
        .error(createHttpError.Conflict(OrganizationMessage.mistekDescription)),
    tags: joi
        .array()
        .min(0)
        .max(10)
        .error(createHttpError.Conflict(OrganizationMessage.mistekTags)),
    published_status: joi
        .boolean()
        .error(createHttpError.Conflict(OrganizationMessage.mistekPublishedStatus)),
    show_in_main_page: joi
        .boolean()
        .error(createHttpError.Conflict(OrganizationMessage.mistekShowInMainPAge)),
    filename: joi
        .string()
        .pattern(FILENMAE_IMAGE_PATTERN)
        .error(createHttpError.BadRequest(OrganizationMessage.mistekFileName)),
    fileUploadPath: joi.allow(),
});

module.exports = {
    createOrganizationSchema,
};
