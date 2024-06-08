const auto_bind = require("auto-bind");
const EventPartnerModel = require("./event_partner.model");
const { createEventPartnerSchema } = require("./event_partner.validation");
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
const eventPartnerMessage = require("./event_partner.message");
const FileModel = require("../file/file_model");
const { EVENTPARTNER_BLACKLIST } = require("../../../common/utills/constrant");

class EventPartnerService {
    #model;
    #fileModel;
    constructor() {
        this.#model = EventPartnerModel;
        this.#fileModel = FileModel;
    }
    async createEventPartner(req, eventPartnerDto) {
        let createFileDetailes, createEventPartner;
        await createEventPartnerSchema.validateAsync(req.body);
        console.log("ddfffgsfgsfgsgsgsgsgsgsdgdgsgs");
        if (eventPartnerDto?.slug) {
            eventPartnerDto.slug = slugify(eventPartnerDto.slug);
            await alreadyExistBySlug(eventPartnerDto.slug, this.#model);
        } else {
            eventPartnerDto.slug = slugify(eventPartnerDto.title);
        }
        createEventPartner = await this.#model.create(eventPartnerDto);
        if (!createEventPartner)
            throw new createHttpError.InternalServerError(
                eventPartnerMessage.internalServerError
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
                type_Id: createEventPartner._id,
                cover: type_files,
                type: "event_partner",
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
                        eventPartnerMessage.internalServerError
                    );
                } else {
                    throw new createHttpError.InternalServerError(
                        eventPartnerMessage.internalServerError
                    );
                }
            }
        }
        const getFileId = createFileDetailes._id;
        await this.#model.updateOne(
            { _id: createEventPartner._id },
            { file: getFileId }
        );
        return createEventPartner;
    }
    async updateEventPartner(code, req, eventPartenrDto){
        let updateTime  = convertGregorianDateToPersionDateToToday();
        const requestBody = copyObject(eventPartenrDto);
        let checkExistEventPartner = await this.listOfEventPartnerByCode(code);
        const blackListFeilds = Object.values(EVENTPARTNER_BLACKLIST);
        deleteInvalidPropertyObject(requestBody, blackListFeilds);
        if(requestBody.status == true){
            requestBody.status = true
        } else if(requestBody.status == false){
            requestBody.status = false
        }

        const fileId = await this.#fileModel.findOne({
            type_Id: checkExistEventPartner._id
        });
        if(req?.body?.fileUploadPath && req?.body?.filename){
            const file_refrence = listOfImageFromRequest(req.files.image || [], req.body.fileUploadPath);
            const orginalName = getFileOrginalname(req.files["image"]);
            const fileEncoding = getFileEncoding(req.files["image"]);
            const mimeType = getFileMimetype(req.files["image"]);
            const fileName = getFileFilename(req.files["image"]);
            const fileSize = getFileSize(req.files["image"]);
            deleteFileInPathArray(fileId.cover);
            await this.#fileModel.updateOne({
                _id: fileId._id
            }, {
                cover: file_refrence,
                originalnames: orginalName,
                encoding: fileEncoding,
                mimetype: mimeType,
                filename: fileName,
                size: fileSize,
                updatedAt: updateTime,
            });
        }
        deleteInvalidPropertyObject(requestBody, []);
        const updateResault = await this.#model.updateOne({
            _id: checkExistEventPartner._id
        }, {
            $set: requestBody, updatedAt: updateTime
        });
        if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError(eventPartnerMessage.internalServerError);
        return updateResault;
    }
    async listOfEventPartnerByCode(code){
        const eventPartner = await this.#model.findOne({code}).populate([
            {path: "file"}
        ]);
        return eventPartner;
    }
}

module.exports = new EventPartnerService();
