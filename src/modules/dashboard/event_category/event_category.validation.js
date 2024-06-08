const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN } = require("../../../common/utills/constrant");
const eventCategoryMessage = require("./event_category.message");

const createEventCategorySchema = joi.object({
    code: joi
        .string()
        .required()
        .error(createHttpError.Conflict(eventCategoryMessage.mistekId)),
    title: joi
        .string()
        .required()
        .trim()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(eventCategoryMessage.mistekTitle)),
    slug: joi
        .string()
        .trim()
        .required()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(eventCategoryMessage.mistekSlug)),
    description: joi
        .string()
        .trim()
        .error(createHttpError.Conflict(eventCategoryMessage.mistekDescription)),
    parent: joi
        .string()
        .trim()
        .pattern(MONGOID_PATTERN)
        .error(createHttpError.Conflict(eventCategoryMessage.mistekParent)),
    tags: joi
        .array()
        .min(0)
        .max(10)
        .error(createHttpError.Conflict(eventCategoryMessage.mistekTags)),
    show_in_archive: joi
        .boolean()
        .error(createHttpError.Conflict(eventCategoryMessage.mistekShowInArchive))
});

module.exports = {
    createEventCategorySchema
};
