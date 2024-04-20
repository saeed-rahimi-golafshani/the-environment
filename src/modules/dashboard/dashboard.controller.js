const auto_bind = require("auto-bind");
const DashboardService = require("./dashboard.service");
const SettingsService = require("./setting/setting_service")

class DashboardController{
    #service;
    #setting_service
    constructor(){
        auto_bind(this);
        this.#service = DashboardService;
        this.#setting_service = SettingsService;
    }
    async dashboard(req, res, next){
        try {
            const setting = await this.#setting_service.listOfSetting();
            const dateNow = await this.#service.persionDateNow();
            res.render("./pages/dashboard/index.ejs", {
                dateNow,
                setting
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new DashboardController()