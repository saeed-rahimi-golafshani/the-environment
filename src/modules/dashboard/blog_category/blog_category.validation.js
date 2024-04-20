const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN } = require("../../../common/utills/constrant");
const blogCategoryMessage = require("./blog_category.message");

const createBlogCategorySchema = joi.object({
    code: joi.string().required().error(createHttpError.Conflict(blogCategoryMessage.mistekId)),
    title: joi.string().required().trim().min(3).max(100).error(createHttpError.Conflict(blogCategoryMessage.mistekTitle)),
    slug: joi.string().trim().required().min(3).max(100).error(createHttpError.Conflict(blogCategoryMessage.mistekSlug)),
    show_in_archive: joi.boolean().error(createHttpError.Conflict(blogCategoryMessage.mistekShowInArchive)),
    priority: joi.string().trim().error(createHttpError.Conflict(blogCategoryMessage.mistekPriority)),
    parent: joi.string().trim().pattern(MONGOID_PATTERN).error(createHttpError.Conflict(blogCategoryMessage.mistekParent)),
    icon: joi.string().allow("").error(createHttpError.Conflict(blogCategoryMessage.mistekIcon))
});

module.exports = {
    createBlogCategorySchema
}