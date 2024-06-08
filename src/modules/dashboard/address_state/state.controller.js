const auto_bind = require("auto-bind");
const SettingsService = require("../setting/setting_service");
const { UniqueCode } = require("../../../common/utills/public.function");
const { CODE_NAME } = require("../../../common/utills/constrant");
const StateModel = require("./state_model");
const StateService = require("./state.service");
const stateMessage = require("./state.message");

class StateController {
    #service;
    #setting_service;
    #stateModel;

    constructor() {
        auto_bind(this);
        this.#service = StateService;
        this.#setting_service = SettingsService;
        this.#stateModel = StateModel;
    }
    async listOfState(req, res, next) {
        try {
            let showTable = false,
                state,
                stateCount = 0;
            const { search } = req.query;
            if (search) {
                state = await this.#stateModel.find({
                    $text: { $search: search },
                });
                stateCount = await this.#stateModel
                    .find({
                        $text: { $search: search },
                    })
                    .countDocuments();
            } else if (search == "") {
                state = await this.#stateModel.find({});
                stateCount = await this.#stateModel.find({}).countDocuments();
            } else {
                state = await this.#stateModel.find({});
                stateCount = await this.#stateModel.find({}).countDocuments();
            }
            if (stateCount == 0) {
                showTable = false;
            } else {
                showTable = true;
            }

            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/address_state/state.list.ejs", {
                showTable,
                state,
                stateCount,
                setting,
            });
        } catch (error) {
            next(error);
        }
    }
    async getCreateState(req, res, next) {
        try {
            const code = await UniqueCode(
                CODE_NAME.ADDRESS_STATE,
                this.#stateModel
            );
            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/address_state/state.add.ejs", {
                code,
                setting,
                messages: req.flash("messages"),
                errors: req.flash("errors"),
            });
        } catch (error) {
            next(error);
        }
    }
    async postCreateState(req, res, next) {
        try {
            const { code, stateName } = req.body;
            console.log(req.body);
            await this.#service.craeteState(req, { code, stateName });
            res.locals.layout = "./pages/dashboard/address_state/state.add.ejs";
            req.flash("messages", stateMessage.created);
            return res.redirect("/add");
        } catch (error) {
            req.flash("errors", error.message);
            next(error);
        }
    }
    async getUpdateState(req, res, next) {
        try {
            const { code } = req.params;
            const state = await this.#service.listOfStateByCode(code);

            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/address_state/state.update.ejs", {
                state,
                setting,
                messages: req.flash("messages"),
                errors: req.flash("errors"),
            });
        } catch (error) {
            next(error);
        }
    }
    async postUpdateState(req, res, next){
        try {
            const { code } = req.params;
            const { stateName } = req.body;
            await this.#service.updateState(code, { stateName });
            res.locals.layout = "./pages/dashboard/address_state/state.update.ejs";
            req.flash("messages", stateMessage.updated);
            return res.redirect("/update");
        } catch (error) {
            req.flash("errors", error.message);
            next(error)
        }
    }
}

module.exports = new StateController();
