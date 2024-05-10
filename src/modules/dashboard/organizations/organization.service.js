const autoBind = require("auto-bind");
const FileModel = require("../file/file_model");
const OrganizationModel = require("./organization.model");
const { createOrganizationSchema } = require("./organization.validation");
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
} = require("../../../common/utills/public.function");
const createHttpError = require("http-errors");
const OrganizationMessage = require("./organization.message");

class OrganizationService {
    #model;
    #fileModel;

    constructor() {
        autoBind(this);
        this.#model = OrganizationModel;
        this.#fileModel = FileModel;
    }
    async createOrganization(req, organizationDto) {
        let createOrganization, createFileDetailes;
        await createOrganizationSchema.validateAsync(req.body);
        if (organizationDto?.slug) {
            organizationDto.slug = slugify(organizationDto.slug);
            await alreadyExistBySlug(organizationDto.slug, this.#model);
        } else {
            organizationDto.slug = slugify(organizationDto.title);
        }
        createOrganization = await this.#model.create(organizationDto);
        if (!createOrganization)
            throw new createHttpError.InternalServerError(
                OrganizationMessage.internalServerError
            );
        if (req?.body?.fileUploadPath) {
            let createTime = convertGregorianDateToPersionDateToToday();
            let updateTime = convertGregorianDateToPersionDateToToday();
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
                type_Id: createOrganization._id,
                cover: type_files,
                type: "organization",
                originalnames: orginalName,
                encoding: fileEncoding,
                mimetype: mimeType,
                filename: fileName,
                size: fileSize,
                createdAt: createTime,
                updatedAt: updateTime,
            });
            if (!createFileDetailes) {
                if (type_files) {
                    deleteFileInPathArray(type_files);
                    throw new createHttpError.InternalServerError(
                        OrganizationMessage.internalServerError
                    );
                } else {
                    throw new createHttpError.InternalServerError(
                        OrganizationMessage.internalServerError
                    );
                }
            }
        }
        const getFileId = createFileDetailes._id;
        await this.#model.updateOne(
            { _id: createOrganization._id },
            { file: getFileId }
        );
        return createOrganization;
    }
}

module.exports = new OrganizationService();
