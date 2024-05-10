const createHttpError = require("http-errors");
const joi = require("joi");
const {
    MONGOID_PATTERN,
    FILENMAE_IMAGE_PATTERN,
} = require("../../../common/utills/constrant");
const newsCategoryMessage = require("./news_category.message");

const createNewsCAtegorySchema = joi.object({
    code: joi
        .string()
        .required()
        .error(createHttpError.Conflict(newsCategoryMessage.mistekId)),
    parent: joi
        .string()
        .trim()
        .required()
        .pattern(MONGOID_PATTERN)
        .error(createHttpError.Conflict(newsCategoryMessage.mistekBlogCategory)),
    title: joi
        .string()
        .required()
        .trim()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(newsCategoryMessage.mistekTitle)),
    slug: joi
        .string()
        .trim()
        .required()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(newsCategoryMessage.mistekSlug)),
    description: joi
        .string()
        .trim()
        .required()
        .error(createHttpError.Conflict(newsCategoryMessage.mistekText)),
    tags: joi
        .array()
        .min(0)
        .max(10)
        .error(createHttpError.Conflict(newsCategoryMessage.mistekTags)),
    priority: joi
        .boolean()
        .error(createHttpError.Conflict(newsCategoryMessage.mistekPriority)),
    show_in_archive: joi
        .boolean()
        .error(createHttpError.Conflict(newsCategoryMessage.mistekShow_in_archive)),
    filename: joi
        .string()
        .pattern(FILENMAE_IMAGE_PATTERN)
        .error(createHttpError.BadRequest(newsCategoryMessage.mistekFileName)),
    fileUploadPath: joi.allow(),
});

module.exports = {
    createNewsCAtegorySchema
};
