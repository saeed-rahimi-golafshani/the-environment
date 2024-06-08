const autoBind = require("auto-bind");
const SettingsService = require("../setting/setting_service");
const EventCategoryService = require("./event_category.service");
const {
    UniqueCode,
    convertGregorianDateToPersionDateToToday,
} = require("../../../common/utills/public.function");
const { CODE_NAME } = require("../../../common/utills/constrant");
const EventCategoryModel = require("./event_category.model");
const eventCategoryMessage = require("./event_category.message");

class EventCategoryController {
    #service;
    #setting_service;
    #eventCategoryModel;

    constructor() {
        autoBind(this);
        this.#service = EventCategoryService;
        this.#setting_service = SettingsService;
        this.#eventCategoryModel = EventCategoryModel;
    }
    async listOfEventCategory(req, res, next) {
        try {
            const { search, parent } = req.query;
            let eventCategories,
                eventCategoryCount = 0,
                showTable = false;
            if (search && parent == "") {
                eventCategories = await this.#eventCategoryModel
                    .find({
                        $text: { $search: search },
                    })
                    .populate([{ path: "parent" }]);
                eventCategoryCount = await this.#eventCategoryModel
                    .find({
                        $text: { $search: search },
                    })
                    .populate([{ path: "parent" }])
                    .countDocuments();
            } else if (search == "" && parent) {
                eventCategories = await this.#eventCategoryModel
                    .find({
                        parent: parent,
                    })
                    .populate([{ path: "parent" }]);
                eventCategoryCount = await this.#eventCategoryModel
                    .find({
                        parent: parent,
                    })
                    .populate([{ path: "parent" }])
                    .countDocuments();
            } else if (search && parent) {
                eventCategories = await this.#eventCategoryModel
                    .find({
                        $text: { $search: search },
                        parent: parent,
                    })
                    .populate([{ path: "parent" }]);
                eventCategoryCount = await this.#eventCategoryModel
                    .find({
                        $text: { $search: search },
                        parent: parent,
                    })
                    .populate([{ path: "parent" }])
                    .countDocuments();
            } else if (search == "" && parent == "") {
                eventCategories = await this.#eventCategoryModel
                    .find({})
                    .populate([{ path: "parent" }]);
                eventCategoryCount = await this.#eventCategoryModel
                    .find({})
                    .populate([{ path: "parent" }])
                    .countDocuments();
            } else {
                eventCategories = await this.#eventCategoryModel
                    .find({})
                    .populate([{ path: "parent" }]);
                eventCategoryCount = await this.#eventCategoryModel
                    .find({})
                    .populate([{ path: "parent" }])
                    .countDocuments();
            }

            if(eventCategoryCount == 0){
                showTable = false;
            } else {
                showTable = true;
            }

            const listOfEventCategory = await this.#service.listOfEventCategory();
            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/event_category/event_category.list.ejs",
                {
                    eventCategories,
                    eventCategoryCount,
                    showTable,
                    listOfEventCategory,
                    setting,
                }
            );
        } catch (error) {
            next(error);
        }
    };
    async getCreateOfEventCategory(req, res, next) {
        try {
            const eventCategories = await this.#service.listOfEventCategory();
            const code = await UniqueCode(
                CODE_NAME.EVENT_CATEGORY,
                this.#eventCategoryModel
            );
            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/event_category/event_category.add.ejs",
                {
                    eventCategories,
                    code,
                    setting,
                    messages: req.flash("messages"),
                    errors: req.flash("errors"),
                }
            );
        } catch (error) {
            next(error);
        }
    };
    async postCreateOfEventCategory(req, res, next) {
        try {
            const {
                code,
                title,
                slug,
                parent,
                description,
                tags,
                show_in_archive,
            } = req.body;
            const createTime = convertGregorianDateToPersionDateToToday();
            const updateTime = convertGregorianDateToPersionDateToToday();
            await this.#service.createEventCategory(req, {
                code,
                title,
                slug,
                parent,
                description,
                tags,
                show_in_archive,
                createdAt: createTime,
                updatedAt: updateTime,
            });
            res.locals.layout =
                "./pages/dashboard/event_category/event_category.add.ejs";
            req.flash("messages", eventCategoryMessage.created);
            return res.redirect("/add");
        } catch (error) {
            req.flash("errors", error.message);
            next(error);
        }
    };
    async getUpdateOfEventCategory(req, res, next){
        try {
            const { code } = req.params;
            const eventCategory = await this.#service.listOfEventCategoryByCode(code);
            const eventCategories = await this.#service.listOfEventCategory();
            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/event_category/event_category.update.ejs",
                {
                    eventCategory,
                    eventCategories,
                    setting,
                    messages: req.flash("messages"),
                    errors: req.flash("errors"),
                }
            ); 
        } catch (error) {
            next(error)
        }
    };
    async postUpdateOfEventCategory(req, res, next){
        try {
            const { code } = req.params;
            const { title, slug, description, parent, tags, show_in_archive } = req.body;
            await this.#service.updateEventCategory(code, { title, slug, description, parent, tags, show_in_archive });
            res.locals.layout =
                "./pages/dashboard/event_category/event_category.update.ejs";
            req.flash("messages", eventCategoryMessage.updated);
            return res.redirect("/update");
        } catch (error) {
            req.flash('errors', error.message)
            next(error)
        }
    }
}

module.exports = new EventCategoryController();
