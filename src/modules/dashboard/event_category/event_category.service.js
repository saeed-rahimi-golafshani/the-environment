const autoBind = require("auto-bind");
const EventCategoryModel = require("./event_category.model");
const { createEventCategorySchema } = require("./event_category.validation");
const { default: mongoose } = require("mongoose");
const eventCategoryMessage = require("./event_category.message");
const {
    checkExistById,
    alreadyExistBySlug,
    copyObject,
    deleteInvalidPropertyObject,
    convertGregorianDateToPersionDateToToday,
} = require("../../../common/utills/public.function");
const { default: slugify } = require("slugify");
const createHttpError = require("http-errors");
const { EVENTCATEGORY_BLACKLIST } = require("../../../common/utills/constrant");

class EventCategoryService {
    #model;
    constructor() {
        autoBind(this);
        this.#model = EventCategoryModel;
    }
    async createEventCategory(req, eventCategoryDto) {
        let eventCategory;
        await createEventCategorySchema.validateAsync(req.body);
        if (eventCategoryDto.parent == "6589d430053a84a4ed2d9829") {
            eventCategoryDto.parent = undefined;
        } else if (eventCategoryDto.parent) {
            if (!mongoose.isValidObjectId(eventCategoryDto.parent))
                throw new createHttpError.BadRequest(
                    eventCategoryMessage.mistekId
                );
            const existEventCategory = await checkExistById(
                eventCategoryDto.parent,
                this.#model
            );
            eventCategoryDto.parent = existEventCategory._id;
        }
        if (eventCategoryDto?.slug) {
            eventCategoryDto.slug = slugify(eventCategoryDto.slug);
            await alreadyExistBySlug(eventCategoryDto.slug, this.#model);
        } else {
            eventCategoryDto.slug = slugify(eventCategoryDto.title);
        }
        eventCategory = await this.#model.create(eventCategoryDto);
        if (!eventCategory)
            throw new createHttpError.InternalServerError(
                eventCategoryMessage.internalServerError
            );
        return eventCategory;
    }
    async updateEventCategory(code, eventCategoryDto) {
        const requestBody = copyObject(eventCategoryDto);
        const checkExistEventCategory = await this.listOfEventCategoryByCode(
            code
        );
        const blackListFeilds = Object.values(EVENTCATEGORY_BLACKLIST);
        deleteInvalidPropertyObject(requestBody, blackListFeilds);
        if (requestBody.show_in_archive == false) {
            requestBody.show_in_archive = false;
        } else if (requestBody.show_in_archive == true) {
            requestBody.show_in_archive = true;
        }
        if (requestBody.parent == "6589d430053a84a4ed2d9829") {
            requestBody.parent = undefined;
        } else if (requestBody.parent) {
            if (!mongoose.isValidObjectId(requestBody.parent))
                throw new createHttpError.BadRequest(
                    eventCategoryMessage.mistekId
                );
            const existEventCategory = await checkExistById(requestBody.parent, this.#model);
            requestBody.parent = existEventCategory._id;
        }
        const updateTime = convertGregorianDateToPersionDateToToday();
        const updateResault = await this.#model.updateOne({code: checkExistEventCategory.code}, {$set: requestBody, updatedAt: updateTime})
        if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError(eventCategoryMessage.internalServerError);
        return updateResault
    }
    async listOfEventCategory() {
        const eventCategory = await this.#model
            .find({})
            .populate([{ path: "parent" }]);
        return eventCategory;
    }
    async listOfEventCategoryByCode(ev_code) {
        const eventCategory = await this.#model
            .findOne({ code: ev_code })
            .populate([{ path: "parent" }]);
        if (!eventCategory)
            throw new createHttpError.InternalServerError(
                eventCategoryMessage.internalServerError
            );
        return eventCategory;
    }
}

module.exports = new EventCategoryService();
