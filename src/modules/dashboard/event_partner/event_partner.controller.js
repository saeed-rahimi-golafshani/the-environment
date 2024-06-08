const auto_bind = require("auto-bind");
const EventPartnerService = require("./event_partner.service");
const SettingsService = require("../setting/setting_service");
const {
    UniqueCode,
    convertGregorianDateToPersionDateToToday,
} = require("../../../common/utills/public.function");
const { CODE_NAME } = require("../../../common/utills/constrant");
const EventPartnerModel = require("./event_partner.model");
const eventPartnerMessage = require("./event_partner.message");

class EventPartnerCOntroller {
    #service;
    #setting_service;
    #modelEventPartner;

    constructor() {
        auto_bind(this);
        this.#service = EventPartnerService;
        this.#setting_service = SettingsService;
        this.#modelEventPartner = EventPartnerModel;
    }
    async listOfEventPartner(req, res, next) {
        try {
            let eventPartners,
                showTable = false,
                eventPartnersCount = 0;
            const { search, status } = req.query;
            if (search && status == "") {
                eventPartners = await this.#modelEventPartner
                    .find({
                        $text: { $search: search },
                    })
                    .populate([{ path: "file" }]);
                eventPartnersCount = await this.#modelEventPartner
                    .find({
                        $text: { $search: search },
                    })
                    .populate([{ path: "file" }])
                    .countDocuments();
            } else if (search == "" && status) {
                eventPartners = await this.#modelEventPartner
                    .find({
                        status,
                    })
                    .populate([{ path: "file" }]);
                eventPartnersCount = await this.#modelEventPartner
                    .find({
                        status,
                    })
                    .populate([{ path: "file" }])
                    .countDocuments();
            } else if (search && status) {
                eventPartners = await this.#modelEventPartner
                    .find({
                        $text: { $search: search },
                        status: status,
                    })
                    .populate([{ path: "file" }]);
                eventPartnersCount = await this.#modelEventPartner
                    .find({
                        $text: { $search: search },
                        status: status,
                    })
                    .populate([{ path: "file" }])
                    .countDocuments();
            } else if (search == "" && status == "") {
                eventPartners = await this.#modelEventPartner
                    .find({})
                    .populate([{ path: "file" }]);
                eventPartnersCount = await this.#modelEventPartner
                    .find({})
                    .populate([{ path: "file" }])
                    .countDocuments();
            } else {
                eventPartners = await this.#modelEventPartner
                    .find({})
                    .populate([{ path: "file" }]);
                eventPartnersCount = await this.#modelEventPartner
                    .find({})
                    .populate([{ path: "file" }])
                    .countDocuments();
            }
            if(eventPartnersCount == 0 ){
                showTable = false
            } else {
                showTable = true
            }
            
            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/event_partner/event_partner.list.ejs",
                {
                    setting,
                    showTable,
                    eventPartners,
                    eventPartnersCount
                }
            );
        } catch (error) {
            next(error);
        }
    }
    async getCreateEventPartner(req, res, next) {
        try {
            const code = await UniqueCode(
                CODE_NAME.EVENT_PARTNER,
                this.#modelEventPartner
            );
            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/event_partner/event_partner.add.ejs",
                {
                    setting,
                    code,
                    messages: req.flash("messages"),
                    errors: req.flash("errors"),
                }
            );
        } catch (error) {
            next(error);
        }
    }
    async postCreateEventPartner(req, res, next) {
        try {
            const { code, title, slug, description, phone, mobile, status } =
                req.body;
            const craeteTime = convertGregorianDateToPersionDateToToday();
            const updateTime = convertGregorianDateToPersionDateToToday();
            await this.#service.createEventPartner(req, {
                code,
                title,
                slug,
                description,
                phone,
                mobile,
                status,
                createdAt: craeteTime,
                updatedAt: updateTime,
            });
            res.locals.layout =
                "./pages/dashboard/event_partner/event_partner.add.ejs";
            req.flash("messages", eventPartnerMessage.created);
            return res.redirect("/add");
        } catch (error) {
            req.flash("errors", error.message);
            next(error);
        }
    }
    async getUpdateEventPartner(req, res, next) {
        try {
            const { code } = req.params;
            const eventPartner = await this.#service.listOfEventPartnerByCode(code);
            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/event_partner/event_partner.update.ejs",
                {
                    eventPartner,
                    setting,
                    messages: req.flash("messages"),
                    errors: req.flash("errors"),
                }
            );
        } catch (error) {
            next(error);
        }
    }
    async postUpdateeventPartner(req, res, next){
        try {
            const { code } = req.params;
            const { title, slug, description, phone, mobile, status } = req.body;
            await this.#service.updateEventPartner(code, req, { title, slug, description, phone, mobile, status });
            res.locals.layout =  "./pages/dashboard/event_partner/event_partner.update.ejs";
            req.flash("messages", eventPartnerMessage.updated);
            return res.redirect("/update");
        } catch (error) {
            req.flash("errors", error.message);
            next(error)
        }
    }
}

module.exports = new EventPartnerCOntroller();
