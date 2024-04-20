const autoBind = require("auto-bind");
const BologCategoryModel = require("./blog_category_model");
const { default: mongoose } = require("mongoose");
const createHttpError = require("http-errors");
const blogCategoryMessage = require("./blog_category.message");
const {
    checkExistById,
    alreadyExistBySlug,
    copyObject,
    deleteInvalidPropertyObject,
    convertGregorianDateToPersionDateToToday,
} = require("../../../common/utills/public.function");
const { default: slugify } = require("slugify");
const { createBlogCategorySchema } = require("./blog_category.validation");
const { BLOGCATEGORY_BLACKLIST } = require("../../../common/utills/constrant");

class BlogCategoryService {
    #model;

    constructor() {
        autoBind(this);
        this.#model = BologCategoryModel;
    }

    async createBlogCategory(req, blogCategoryDto) {
        let blogCategory;
        await createBlogCategorySchema.validateAsync(req.body);
        if (blogCategoryDto.parent == "6589d430053a84a4ed2d9829") {
            blogCategoryDto.parent = undefined;
        } else if (blogCategoryDto.parent) {
            if (!mongoose.isValidObjectId(blogCategoryDto.parent))
                throw new createHttpError.BadRequest(
                    blogCategoryMessage.mistekId
                );
            const existBlogCategory = await checkExistById(
                blogCategoryDto.parent,
                this.#model
            );
            blogCategoryDto.parent = existBlogCategory._id;
        }
        if (blogCategoryDto?.slug) {
            blogCategoryDto.slug = slugify(blogCategoryDto.slug);
            await alreadyExistBySlug(blogCategoryDto.slug, this.#model);
        } else {
            blogCategoryDto.slug = slugify(blogCategoryDto.title);
        }
        blogCategory = await this.#model.create(blogCategoryDto);
        if (!blogCategory)
            throw new createHttpError.InternalServerError(
                blogCategoryMessage.internalServerError
            );
        return blogCategory;
    }
    async updateBlogCategory(code, blogCategoryDto) {
        console.log(blogCategoryDto);
        const requestBody = copyObject(blogCategoryDto);
        console.log(requestBody);
        const checkExistBlogCategory = await this.listOfBlogCategoryByCode(
            code
        );
        const blackListFeilds = Object.values(BLOGCATEGORY_BLACKLIST);
        deleteInvalidPropertyObject(requestBody, blackListFeilds);
        if (requestBody.show_in_archive == false) {
            requestBody.show_in_archive = false;
        } else if (requestBody.show_in_archive == true) {
            requestBody.show_in_archive = true;
        }
        if (requestBody.priority == false) {
            requestBody.priority = false;
        } else if (requestBody.priority == true) {
            requestBody.priority = true;
        }
        if (requestBody.parent == "6589d430053a84a4ed2d9829") {
            requestBody.parent = undefined;
        } else if (requestBody.parent) {
            if (!mongoose.isValidObjectId(requestBody.parent))
                throw new createHttpError.BadRequest(
                    blogCategoryMessage.mistekId
                );
            const existBlogCategory = await checkExistById(
                requestBody.parent,
                this.#model
            );
            requestBody.parent = existBlogCategory._id;
        }
        const updatedTime = convertGregorianDateToPersionDateToToday();
        const updateResault = await this.#model.updateOne({code: checkExistBlogCategory.code}, {$set: requestBody, updatedAt: updatedTime});
        if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError(blogCategoryMessage.internalServerError);
        return updateResault 
    }
    async listOfBlogCategory() {
        const blogCategory = await this.#model
            .find({})
            .populate([{ path: "parent" }]);
        return blogCategory;
    }
    async listOfBlogCategoryByCode(bC_code) {
        const blogCategory = await this.#model
            .findOne({ code: bC_code })
            .populate([{ path: "parent" }]);
        if (!blogCategory)
            throw new createHttpError.NotFound(blogCategoryMessage.notFound);
        return blogCategory;
    }
}

module.exports = new BlogCategoryService();
