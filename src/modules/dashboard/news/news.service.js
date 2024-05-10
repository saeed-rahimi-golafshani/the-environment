const autoBind = require("auto-bind");
const NewsModel = require("./news.model");
const FileModel = require("../file/file_model");
const { createNewsSchema } = require("./news.validation");
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
    copyObject,
    deleteInvalidPropertyObject,
} = require("../../../common/utills/public.function");
const createHttpError = require("http-errors");
const newsMessage = require("./news.message");
const { NEWS_BLACKLIST } = require("../../../common/utills/constrant");
const { request } = require("express");

class NewsService {
    #model;
    #fileModel;

    constructor() {
        autoBind(this);
        this.#model = NewsModel;
        this.#fileModel = FileModel;
    }

    async createNews(req, newsDto) {
        let create_news, createFileDetailes;
        let createdTime = convertGregorianDateToPersionDateToToday();
        let updatedTime = convertGregorianDateToPersionDateToToday();
        await createNewsSchema.validateAsync(req.body);
        if (newsDto?.slug) {
            newsDto.slug = slugify(newsDto.slug);
            await alreadyExistBySlug(newsDto.slug, this.#model);
        } else {
            newsDto.slug = slugify(newsDto.title);
        }
        create_news = await this.#model.create(newsDto);
        if (!create_news)
            throw new createHttpError.InternalServerError(
                newsMessage.internalServerError
            );
        if (req?.body?.fileUploadPath) {
            let type_files = listOfImageFromRequest(
                req.files.image || [],
                req.body.fileUploadPath
            );
            const orginalName = getFileOrginalname(req.files["image"]);
            const fileEncoding = getFileEncoding(req.files["image"]);
            const mimeType = getFileMimetype(req.files["image"]);
            const fileName = getFileFilename(req.files["image"]);
            const fileSize = getFileSize(req.files["image"]);
            createFileDetailes = await this.#fileModel.create({
                type_Id: create_news._id,
                cover: type_files,
                type: "news",
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
                        newsMessage.internalServerError
                    );
                } else {
                    throw new createHttpError.InternalServerError(
                        newsMessage.internalServerError
                    );
                }
            }
        }
        const getFileId = createFileDetailes._id;
        await this.#model.updateOne(
            { _id: create_news._id },
            { file: getFileId }
        );
        return create_news;
    }
    async updateNews(code, req, newsDto) {
        let updateTime = convertGregorianDateToPersionDateToToday();
        const requestBody = copyObject(newsDto);
        let checkExistNews = await this.listOfNewsByCode(code);

        const blackListFeilds = Object.values(NEWS_BLACKLIST);
        deleteInvalidPropertyObject(requestBody, blackListFeilds);

        if (requestBody.published_status == true) {
            requestBody.published_status = true;
        } else if (requestBody.published_status == false) {
            requestBody.published_status = false;
        }
        if (requestBody.breaking_news == true) {
            requestBody.breaking_news = true;
        } else if (requestBody.breaking_news == false) {
            requestBody.breaking_news = false;
        }

        const fileId = await this.#fileModel.findOne({
            type_Id: checkExistNews._id,
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
                    updatedAt: updateTime,
                }
            );
        }
        const updateResault = await this.#model.updateOne(
            { _id: checkExistNews._id },
            { $set: requestBody, updatedAt: updateTime }
        );
        if (updateResault.modifiedCount == 0)
            throw new createHttpError.InternalServerError(
                newsMessage.internalServerError
            );
        return updateResault;
    }
    async listOfNews() {
        let news;
        news = await this.#model
            .find({})
            .populate([{ path: "news_category_id" }, { path: "file" }]);
        return news;
    }
    async listOfNewsByCode(code) {
        const news = await this.#model
            .findOne({ code })
            .populate([{ path: "file" }, { path: "news_category_id" }]);
        return news;
    }
}

module.exports = new NewsService();
