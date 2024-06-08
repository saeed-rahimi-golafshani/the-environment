const auto_bind = require("auto-bind");
const { createEventStatusSchema } = require("./event_status.validation");
const { alreadyExistByTitle, copyObject, deleteInvalidPropertyObject } = require("../../../common/utills/public.function");
const EventStatusModel = require("./event_status.model");
const createHttpError = require("http-errors");
const eventStatusMessage = require("./event_status.message");
const { EVENTSTATUS_BLACKLIST } = require("../../../common/utills/constrant");

class EventStatusService{
    #model;

    constructor(){
        auto_bind(this);
        this.#model = EventStatusModel;
    }
    async createEventStatus(req, eventStatusDto){
        await createEventStatusSchema.validateAsync(req.body);
        const checkExistByTitle = await this.#model.findOne({title: eventStatusDto.title});
        if(checkExistByTitle) throw new createHttpError.Conflict(eventStatusMessage.alreadyExist);
        const createEventStatus = await this.#model.create(eventStatusDto);
        if(!createEventStatus) throw new createHttpError.InternalServerError(eventStatusMessage.internalServerError);
        return createEventStatus;
    }
    async updateEventStatus(code, eventStatusDto){
        const requestBody = copyObject(eventStatusDto);
        const checkExistEventStatus = await this.listOfEventStatusByCode(code);
        const blackListFeilds = Object.values(EVENTSTATUS_BLACKLIST);
        deleteInvalidPropertyObject(requestBody, blackListFeilds);
        const updateResault = await this.#model.updateOne({code: checkExistEventStatus.code}, {$set: requestBody});
        if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError(eventStatusMessage.internalServerError);
        return updateResault;
    }
    async listOfEventStatusByCode(code){
        const eventStatus = await this.#model.findOne({code});
        return eventStatus
    }
    async listOfEventStatus(){
        const eventStatuses = await this.#model.find({});
        return eventStatuses
    }
}
 
module.exports = new EventStatusService();