const createHttpError = require("http-errors");
const joi = require("joi");
const {
    MONGOID_PATTERN,
    FILENMAE_IMAGE_PATTERN,
} = require("../../../common/utills/constrant");
const newsMessage = require("./news.message");

const createNewsSchema = joi.object({
    code: joi
        .string()
        .required()
        .error(createHttpError.Conflict(newsMessage.mistekId)),
    news_category_id: joi
        .string()
        .trim()
        .required()
        .pattern(MONGOID_PATTERN)
        .error(createHttpError.Conflict(newsMessage.mistekNewsCategory)),
    foreword: joi
        .string()
        .trim()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(newsMessage.mistekForeword)),
    title: joi
        .string()
        .required()
        .trim()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(newsMessage.mistekTitle)),
    slug: joi
        .string()
        .trim()
        .required()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(newsMessage.mistekSlug)),
    short_text: joi
        .string()
        .trim()
        .required()
        .error(createHttpError.Conflict(newsMessage.mistekShortText)),
    text: joi
        .string()
        .trim()
        .required()
        .error(createHttpError.Conflict(newsMessage.mistekText)),
    tags: joi
        .array()
        .min(0)
        .max(10)
        .error(createHttpError.Conflict(newsMessage.mistekTags)),
    source: joi
        .string()
        .required()
        .trim()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(newsMessage.mistekSource)),
    published_time: joi
        .string()
        .required()
        .error(createHttpError.Conflict(newsMessage.mistekPublishedTime)),
    published_status: joi
        .boolean()
        .error(createHttpError.Conflict(newsMessage.mistekPublishedStatus)),
    breaking_news: joi
        .boolean()
        .error(createHttpError.Conflict(newsMessage.mistekBreaking_news)),
    filename: joi
        .string()
        .pattern(FILENMAE_IMAGE_PATTERN)
        .error(createHttpError.BadRequest(newsMessage.mistekFileName)),
    fileUploadPath: joi.allow(),
});

module.exports = {
    createNewsSchema,
};
