const autoBind = require("auto-bind");
const { createBlogSchema } = require("./blog.validation");
const { default: slugify } = require("slugify");
const {
    alreadyExistBySlug,
    convertGregorianDateToPersionDateToToday,
    listOfImageFromRequest,
    getFileOrginalname,
    getFileEncoding,
    getFileMimetype,
    getFileFilename,
    getFileSize,
    deleteFileInPathArray,
    deleteInvalidPropertyObject,
    copyObject,
    convertDate,
} = require("../../../common/utills/public.function");
const blogModel = require("./blog_model");
const createHttpError = require("http-errors");
const blogMessage = require("./blog.messages");
const FileModel = require("../file/file_model");
const BLOG_BLACKLIST = require("../../../common/utills/constrant");
const sharp = require("sharp");

class BlogService {
    #model;
    #fileModel;

    constructor() {
        autoBind(this);
        this.#model = blogModel;
        this.#fileModel = FileModel;
    }

    async craeteBlog(req, blogDto) {
        let createBlog, createFileDetailes;
        await createBlogSchema.validateAsync(req.body);
        if (blogDto?.slug) {
            blogDto.slug = slugify(blogDto.slug);
            await alreadyExistBySlug(blogDto.slug, this.#model);
        } else {
            blogDto.slug = slugify(blogDto.title);
        }
        if(blogDto.published_time){
            blogDto.published_time = convertDate(blogDto.published_time)
        }
        createBlog = await this.#model.create(blogDto);
        if (!createBlog)
            throw new createHttpError.InternalServerError(
                blogMessage.internalServerError
            );
        if (req?.body?.fileUploadPath) {
            let createdTime = convertGregorianDateToPersionDateToToday();
            let updatedTime = convertGregorianDateToPersionDateToToday();
            const type_files = listOfImageFromRequest(
                req.files.image || [],
                req.body.fileUploadPath
            );

            const orginalName = getFileOrginalname(req.files["image"]);
            const fileEncoding = getFileEncoding(req.files["image"]);
            const mimeType = getFileMimetype(req.files["image"]);
            const fileName = getFileFilename(req.files["image"]);
            const fileSize = getFileSize(req.files["image"]);
            createFileDetailes = await this.#fileModel.create({
                type_Id: createBlog._id,
                cover: type_files,
                type: "blog",
                originalnames: orginalName,
                encoding: fileEncoding,
                mimetype: mimeType,
                filename: fileName,
                size: fileSize,
                createdAt: createdTime,
                updatedAt: updatedTime,
            });

            if (!createFileDetailes) {
                if (type_files) {
                    deleteFileInPathArray(type_files);
                    throw new createHttpError.InternalServerError(
                        blogMessage.internalServerError
                    );
                } else {
                    throw new createHttpError.InternalServerError(
                        blogMessage.internalServerError
                    );
                }
            }
        }

        const getFileId = createFileDetailes._id;
        await this.#model.updateOne(
            { _id: createBlog._id },
            { file: getFileId }
        );
        return createBlog;
    }
    async updateBlog(code, req, blogDto) {
        let updatedTime = convertGregorianDateToPersionDateToToday();
        const requestBody = copyObject(blogDto);
        let checkExistBlog = await this.listOfBlogByCode(code);
        const blackListFeilds = Object.values(BLOG_BLACKLIST);
        deleteInvalidPropertyObject(requestBody, blackListFeilds);
        if (requestBody.published_status == true) {
            requestBody.published_status = true;
        } else if (requestBody.published_status == false) {
            requestBody.published_status = false;
        }
        if(requestBody.published_time){
            requestBody.published_time = convertDate(requestBody.published_time)
        }

        const fileId = await this.#fileModel.findOne({
            type_Id: checkExistBlog._id,
        });
        if (req?.body?.fileUploadPath && req?.body?.filename) {
            const file_refrence = listOfImageFromRequest(
                req.files.image || [],
                req.body.fileUploadPath
            );
            const orginalName = getFileOrginalname(req.files["image"]);
            const fileEncoding = getFileEncoding(req.files["image"]);
            const mimeType = getFileMimetype(req.files["image"]);
            const fileName = getFileFilename(req.files["image"]);
            const fileSize = getFileSize(req.files["image"]);

            deleteFileInPathArray(fileId.cover);
            await this.#fileModel.updateOne(
                {
                    _id: fileId._id,
                },
                {
                    cover: file_refrence,
                    originalnames: orginalName,
                    encoding: fileEncoding,
                    mimetype: mimeType,
                    filename: fileName,
                    size: fileSize,
                    updatedAt: updatedTime,
                }
            );
        }
        deleteInvalidPropertyObject(requestBody, []);
        const updateResault = await this.#model.updateOne(
            { _id: checkExistBlog._id },
            { $set: requestBody, updatedAt: updatedTime }
        );
        if (updateResault.modifiedCount == 0) {
            throw new createHttpError.InternalServerError(
                blogMessage.internalServerError
            );
        }
        return updateResault;
    }
    async listOfBlogs() {
        let blogs;
        blogs = await this.#model
            .find({})
            .populate([{ path: "blog_category_id" }, { path: "file" }]);
        return blogs;
    }
    async listOfBlogByCode(code) {
        let blog;
        blog = await this.#model
            .findOne({ code })
            .populate([{ path: "blog_category_id" }, { path: "file" }]);
        return blog;
    }
}

module.exports = new BlogService();
