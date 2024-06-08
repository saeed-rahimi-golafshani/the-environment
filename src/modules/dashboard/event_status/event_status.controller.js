const auto_bind = require("auto-bind");
const SettingsService = require("../setting/setting_service");
const { UniqueCode } = require("../../../common/utills/public.function");
const { CODE_NAME } = require("../../../common/utills/constrant");
const EventStatusModel = require("./event_status.model");
const EventStatusService = require("./event_status.service");
const eventStatusMessage = require("./event_status.message");

class EventStatusController {
    #service;
    #setting_service;
    #eventStatusModel;

    constructor() {
        auto_bind(this);
        this.#service = EventStatusService;
        this.#setting_service = SettingsService;
        this.#eventStatusModel = EventStatusModel;
    }
    async listOfEventStatus(req, res, next) {
        try {
            let showTable = false,
                eventStatusCount = 0,
                eventStatuses;
            eventStatuses = await this.#eventStatusModel.find({});
            eventStatusCount = await this.#eventStatusModel
                .find({})
                .countDocuments();
            if (eventStatusCount > 0) {
                showTable = true;
            } else {
                showTable = false;
            }
            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/event_status/event_status.list.ejs", {
                showTable,
                eventStatuses,
                eventStatusCount,
                setting,
            });
        } catch (error) {
            next(error);
        }
    }
    async getCreateEventStatus(req, res, next) {
        try {
            const code = await UniqueCode(
                CODE_NAME.EVENT_STATUS,
                this.#eventStatusModel
            );
            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/event_status/event_status.add.ejs", {
                code,
                setting,
                messages: req.flash("messages"),
                errors: req.flash("errors"),
            });
        } catch (error) {
            next(error);
        }
    }
    async postCreateEventStatus(req, res, next) {
        try {
            const { code, title } = req.body;
            await this.#service.createEventStatus(req, { code, title });
            res.locals.layout =
                "./pages/dashboard/event_status/event_status.add.ejs";
            req.flash("messages", eventStatusMessage.created);
            return res.redirect("/add");
        } catch (error) {
            req.flash("errors", error.message);
            next(error);
        }
    }
    async getUpdateEventStatus(req, res, next) {
        try {
            const { code } = req.params;
            const eventStatus = await this.#service.listOfEventStatusByCode(
                code
            );
            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/event_status/event_status.update.ejs",
                {
                    eventStatus,
                    setting,
                    messages: req.flash("messages"),
                    errors: req.flash("errors"),
                }
            );
        } catch (error) {
            next(error);
        }
    }
    async postUpdateEventStatus(req, res, next) {
        try {
            const { code } = req.params;
            const { title } = req.body;
            await this.#service.updateEventStatus(code, { title });
            res.locals.layout =
                "./pages/dashboard/event_status/event_status.update.ejs";
            req.flash("messages", eventStatusMessage.updated);
            return res.redirect("/update");
        } catch (error) {
            req.flash('errors', error.message)
            next(error);
        }
    }
}

module.exports = new EventStatusController();
