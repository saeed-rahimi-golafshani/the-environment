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
} = require("../../../common/utills/public.function");
const blogModel = require("./blog_model");
const createHttpError = require("http-errors");
const blogMessage = require("./blog.messages");
const FileModel = require("../file/file_model");

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
            if (!createFileDetailes)
                throw new createHttpError.InternalServerError(
                    blogMessage.internalServerError
                );
        }

        const getFileId = createFileDetailes._id;
        await this.#model.updateOne(
            { _id: createBlog._id },
            { file: getFileId }
        );
        return createBlog;
    };
    async listOfBlogs() {
        let blogs;
        blogs = await this.#model.find({}).populate([
            {path: "blog_category_id"},
            {path: "file"}
        ]);
        return blogs;
    }
}

module.exports = new BlogService();
