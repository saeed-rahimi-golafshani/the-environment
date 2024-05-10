const auto_bind = require("auto-bind");
const { createNewsCAtegorySchema } = require("./news_category.validation");
const { default: slugify } = require("slugify");
const {
    alreadyExistBySlug,
    checkExistById,
    convertGregorianDateToPersionDateToToday,
    listOfImageFromRequest,
    getFileOrginalname,
    getFileEncoding,
    getFileMimetype,
    getFileFilename,
    getFileSize,
    copyObject,
    deleteInvalidPropertyObject,
    deleteFileInPathArray,
    deleteFileInPath,
} = require("../../../common/utills/public.function");
const NewsCategoryModel = require("./news_category.model");
const { default: mongoose } = require("mongoose");
const newsCategoryMessage = require("./news_category.message");
const createHttpError = require("http-errors");
const FileModel = require("../file/file_model");
const { NEWSCATEGORY_BLACKLIST } = require("../../../common/utills/constrant");

class NewsCategoryService {
    #model;
    #fileModel;

    constructor() {
        auto_bind(this);
        this.#model = NewsCategoryModel;
        this.#fileModel = FileModel;
    }
    async createNewsCategory(req, newsCategoryDto) {
        let createNewsCategiry, createFileDetailes;
        await createNewsCAtegorySchema.validateAsync(req.body);
        if (newsCategoryDto.parent == "6589d430053a84a4ed2d9829") {
            newsCategoryDto.parent = undefined;
        } else if (newsCategoryDto.parent) {
            if (!mongoose.isValidObjectId(newsCategoryDto.parent))
                throw new createHttpError.BadRequest(
                    newsCategoryMessage.mistekId
                );
            const existNewsCategory = await checkExistById(
                newsCategoryDto.parent,
                this.#model
            );
            newsCategoryDto.parent = existNewsCategory._id;
        }
        if (newsCategoryDto?.slug) {
            newsCategoryDto.slug = slugify(newsCategoryDto.slug);
            await alreadyExistBySlug(newsCategoryDto.slug, this.#model);
        } else {
            newsCategoryDto.slug = slugify(newsCategoryDto.title);
        }
        createNewsCategiry = await this.#model.create(newsCategoryDto);
        if (!createNewsCategiry)
            throw new createHttpError.InternalServerError(
                newsCategoryMessage.internalServerError
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
                type_Id: createNewsCategiry._id,
                cover: type_files,
                type: "news_category",
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
                    newsCategoryMessage.internalServerError
                );
        }
        const getFileId = createFileDetailes._id;
        await this.#model.updateOne(
            { _id: createNewsCategiry._id },
            { file: getFileId }
        );
        return createNewsCategiry;
    }
    async updateNewsCatgory(code, req, newsCategoryDto){
        let updatedTime = convertGregorianDateToPersionDateToToday();
        const requestBody = copyObject(newsCategoryDto);
        let checkExistNewsCategory = await this.listOfNewsCategoryByCode(code);

        const blackListFeilds = Object.values(NEWSCATEGORY_BLACKLIST);
        deleteInvalidPropertyObject(requestBody, blackListFeilds);
        
        if(requestBody.show_in_archive == true){
            requestBody.show_in_archive = true;
        } else if(requestBody.show_in_archive == false){
            requestBody.show_in_archive = false
        };
        if(requestBody.priority == true){
            requestBody.priority = true;
        } else if(requestBody.priority == false){
            requestBody.priority = false
        };
        if(requestBody.parent == "6589d430053a84a4ed2d9829"){
            requestBody.parent = undefined;
        } else if(requestBody.parent){
            if(!mongoose.isValidObjectId(requestBody.parent)) throw new createHttpError.Conflict(newsCategoryMessage.mistekId);
            const existNewsCategory = await checkExistById(requestBody.parent, this.#model);
            requestBody.parent = existNewsCategory._id;
        }
        const fileId = await this.#fileModel.findOne({
            type_Id: checkExistNewsCategory._id
        });
        if(req?.body?.fileUploadPath && req?.body?.filename){
            const file_refrence = listOfImageFromRequest(req.files.image || [], req.body.fileUploadPath);
            const orginalName = getFileOrginalname(req.files["image"]);
            const fileEncoding = getFileEncoding(req.files["image"]);
            const mimeType = getFileMimetype(req.files["image"]);
            const fileName = getFileFilename(req.files["image"]);
            const fileSize = getFileSize(req.files["image"]);
            deleteFileInPathArray(fileId.cover)
            await this.#fileModel.updateOne({_id: fileId._id}, {
                cover: file_refrence,
                    originalnames: orginalName,
                    encoding: fileEncoding,
                    mimetype: mimeType,
                    filename: fileName,
                    size: fileSize,
                    updatedAt: updatedTime, 
            });
        }
        deleteInvalidPropertyObject(requestBody, []);
        const updateResault = await this.#model.updateOne({_id: checkExistNewsCategory}, {$set: requestBody, updatedAt: updatedTime});
        if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError(newsCategoryMessage.internalServerError);
        return updateResault;


    }
    async listOfNewsCategory() {
        const newsCategory = await this.#model
            .find({})
            .populate([{ path: "parent" }, { path: "file" }]);
        return newsCategory;
    }
    async listOfNewsCategoryByCode(code) {
        const newsCategory = await this.#model
            .findOne({ code })
            .populate([{ path: "parent" }, { path: "file" }]);
        return newsCategory;
    }
}

module.exports = new NewsCategoryService();
