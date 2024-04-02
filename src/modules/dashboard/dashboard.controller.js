const auto_bind = require("auto-bind");
const DashboardService = require("./dashboard.service");

class DashboardController{
    #service;
    constructor(){
        auto_bind(this);
        this.#service = DashboardService
    }
    async dashboard(req, res, next){
        try {
            const dateNow = await this.#service.persionDateNow();
            res.render("./pages/dashboard/index.ejs", {
                dateNow
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new DashboardController()