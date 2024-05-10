const autoBind = require("auto-bind");
const SettingsModel = require("./setting_model");
const SettingsMessage = require("./setting_message");
const createHttpError = require("http-errors");
const { 
    deleteInvalidPropertyObject, 
    convertGregorianDateToPersionDateToToday, 
    listOfImageFromRequest, 
    getFileOrginalname,
    getFileEncoding,
    getFileMimetype,
    getFileFilename,
    getFileSize,
    extractTwoLinesDescription,
    deleteFileInPathArray} = require("../../../common/utills/public.function");
const FileModel = require("../file/file_model");

class SettingsService {
    #model;
    #fileModel

    constructor() {
        autoBind(this);
        this.#model = SettingsModel;
        this.#fileModel = FileModel
    }
    async listOfSetting(){
        const setting = await this.#model.findOne({})
        .populate([
            {path: "file"}
        ]);
        return setting
    };
    async postCreateSetting(settingDto, req) {
      
        let createSetting, createFileDetailes;
        createSetting = await this.#model.create(settingDto);
        if (!createSetting) throw new createHttpError.InternalServerError(SettingsMessage.internalServerError);
        if(req?.body?.fileUploadPath){
            let createdTime = convertGregorianDateToPersionDateToToday();
            let updatedTime = convertGregorianDateToPersionDateToToday();
            const type_files = listOfImageFromRequest(req.files.image || [], req.body.fileUploadPath);
            const orginalName = getFileOrginalname(req.files["image"]);
            const fileEncoding = getFileEncoding(req.files["image"]);
            const mimeType = getFileMimetype(req.files["image"]);
            const fileName = getFileFilename(req.files["image"]);
            const fileSize = getFileSize(req.files["image"]);
            
            createFileDetailes = await this.#fileModel.create({
                type_Id: createSetting._id,
                cover: type_files,
                type: "setting",
                originalnames: orginalName,
                encoding: fileEncoding,
                mimetype: mimeType,
                filename: fileName,
                size: fileSize,
                createdAt: createdTime,
                updatedAt: updatedTime,
            });
            if (!createFileDetailes)
                throw new createHttpError.InternalServerError(SettingsMessage.internalServerError);
        }
        console.log(createFileDetailes._id);
        const getFileId = createFileDetailes._id;
        await this.#model.updateOne({ _id: createSetting._id }, { file: getFileId });
        return createSetting;
    };
    async updateSetting(code, req, settingDto){
        const checkExistSetting = await this.listOfSettingByCode(code);
        if(settingDto.launching_status == true){
            settingDto.launching_status = true
        } else if(settingDto.launching_status == false){
            settingDto.launching_status = false
        }
        if(settingDto.title_next_to_Logo == true){
            settingDto.title_next_to_Logo = true;
        } else if(settingDto.title_next_to_Logo == false){
            settingDto.title_next_to_Logo = false
        };
        const fileId = await this.#fileModel.findOne({type_Id: checkExistSetting._id});
        if(req.body.fileUploadPath && req.body.filename) {
            const file_refrence = listOfImageFromRequest(req.files.image || [], req.body.fileUploadPath);
            const orginalName = getFileOrginalname(req.files['image']);
            const fileEncoding = getFileEncoding(req.files['image']);
            const mimeType = getFileMimetype(req.files['image']);
            const fileName = getFileFilename(req.files['image']);
            const fileSize = getFileSize(req.files['image']);
            let updatedTime = convertGregorianDateToPersionDateToToday();
            deleteFileInPathArray(fileId.cover)
            await this.#fileModel.updateOne({
                _id: fileId._id
            },
            {
                cover: file_refrence, 
                originalnames: orginalName, 
                encoding: fileEncoding,
                mimetype: mimeType,
                filename: fileName, 
                size: fileSize,
                updatedAt: updatedTime
            })
        }

        deleteInvalidPropertyObject(settingDto, []);
        const updateResault = await this.#model.updateOne(
            {_id: checkExistSetting._id},
            {$set: settingDto}
        );
        if(updateResault.modifiedCount == 0){
            throw new createHttpError.InternalServerError(SettingsMessage.internalServerError)
        };
        return updateResault
    }
    async settingOfCount(){
        const settingCount = await this.#model.find({}).countDocuments();
        return settingCount
    };
    async checkOfSettingByTitle(title){
        const settings = await this.#model.findOne({title});
        if(settings){
         throw new createHttpError[403](SettingsMessage.alreadyExist)
        }
        return settings
    }; 
    async listOfSettingByCode(code){
        const setting = await this.#model.findOne({_id: code});
        return setting
    }
    async getLineDescription(){
        const text = await this.listOfSetting();
        if(!text){
            return null
        }
        const getText = extractTwoLinesDescription(text.description);
        return getText
    }
                                          
}

module.exports = new SettingsService();
