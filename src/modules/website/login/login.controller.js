const auto_bind = require("auto-bind");
const SettingsService = require("../../dashboard/setting/setting_service");

class LoginController{
    #setting_service;

    constructor(){
        auto_bind(this);
        this.#setting_service = SettingsService;

    }
    async LoginPage(req, res, next){
        try {
            let setting, getTwoLine
            
            getTwoLine = await this.#setting_service.getLineDescription();
            setting = await this.#setting_service.listOfSetting();
            res.locals.layout = "./layouts/website/login/main.ejs";
                res.render("./pages/website/login/login.ejs", {
                    setting,
                    getTwoLine,
                    messages: req.flash("messages"),
                    errors: req.flash("errors"),
                    
                })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new LoginController()