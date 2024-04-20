const createHttpError = require("http-errors");
const joi = require("joi");
const {
    MONGOID_PATTERN,
    FILENMAE_IMAGE_PATTERN,
} = require("../../../common/utills/constrant");
const blogMessage = require("./blog.messages");

const createBlogSchema = joi.object({
    code: joi
        .string()
        .required()
        .error(createHttpError.Conflict(blogMessage.mistekId)),
    blog_category_id: joi
        .string()
        .trim()
        .required()
        .pattern(MONGOID_PATTERN)
        .error(createHttpError.Conflict(blogMessage.mistekBlogCategory)),
    title: joi
        .string()
        .required()
        .trim()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(blogMessage.mistekTitle)),
    slug: joi
        .string()
        .trim()
        .required()
        .min(3)
        .max(100)
        .error(createHttpError.Conflict(blogMessage.mistekSlug)),
    short_text: joi
        .string()
        .trim()
        .required()
        .error(createHttpError.Conflict(blogMessage.mistekShortText)),
    text: joi
        .string()
        .trim()
        .required()
        .error(createHttpError.Conflict(blogMessage.mistekText)),
    tags: joi
        .array()
        .min(0)
        .max(10)
        .error(createHttpError.Conflict(blogMessage.mistekTags)),
    blog_type: joi
        .string()
        .trim()
        .error(createHttpError.Conflict(blogMessage.mistekBlogType)),
    published_time: joi
        .string()
        .error(createHttpError.Conflict(blogMessage.mistekPublishedTime)),
    published_status: joi
        .boolean()
        .error(createHttpError.Conflict(blogMessage.mistekPublishedStatus)),
    filename: joi
        .string()
        .pattern(FILENMAE_IMAGE_PATTERN)
        .error(createHttpError.BadRequest(blogMessage.mistekFileName)),
    fileUploadPath: joi.allow(),
});

module.exports = {
    createBlogSchema,
};
