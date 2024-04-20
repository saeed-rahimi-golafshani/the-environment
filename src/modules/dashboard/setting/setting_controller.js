const autoBind = require("auto-bind");
const SettingsService = require("./setting_service");
const SettingsMessage = require("./setting_message");

class SettingsController {
    #service;
   
    constructor() {
        autoBind(this);
        this.#service = SettingsService;     
    }

    async getCreateSettings(req, res, next) {
        try {

            const setting = await this.#service.listOfSetting();
            const settingCount = await this.#service.settingOfCount();

            res.render("./pages/dashboard/setting/setting_add.ejs", {
                messages: req.flash('messages'),
                errors: req.flash('errors'),
                setting,
                settingCount
            });

        } catch (error) {
           next(error)
        }
    };

    async postCreateSettings(req, res, next) {
        try {
            const {
                site_icon,
                title,
                title_next_to_Logo,
                description,
                tags,
                title_mega_menu,
                // mega_menu_icon,
                title_first_footer,
                title_second_footer,
                title_third_footer,
                title_fourth_menu,
                phone_number,
                email,
                android_link,
                ios_link,
                slider_delay,
                launching_status,
                launching_title,
                launching_description,
            } = req.body;
           
            await this.#service.postCreateSetting({
                site_icon,
                title,
                title_next_to_Logo,
                description,
                tags,
                title_mega_menu,
                // mega_menu_icon,
                title_first_footer,
                title_second_footer,
                title_third_footer,
                title_fourth_menu,
                phone_number,
                email,
                android_link,
                ios_link,
                slider_delay,
                launching_status,
                launching_title,
                launching_description,
            }, req);
           
            req.flash('messages', SettingsMessage.CREATED);
            return res.redirect("/setting");
            
        } catch (error) {
           req.flash('errors', error.message)
           next(error)
        }
    };
    async updateSetting(req, res, next){
        try {
            const { code } = req.params;
            const {
                site_icon,
                title,
                title_next_to_Logo,
                description,
                tags,
                title_mega_menu,
                // mega_menu_icon,
                title_first_footer,
                title_second_footer,
                title_third_footer,
                title_fourth_menu,
                phone_number,
                email,
                android_link,
                ios_link,
                slider_delay,
                launching_status,
                launching_title,
                launching_description,
            } = req.body;
           
            const updateSetting = await this.#service.updateSetting(code, req, {

                site_icon,
                title,
                title_next_to_Logo,
                description,
                tags,
                title_mega_menu,
                // mega_menu_icon,
                title_first_footer,
                title_second_footer,
                title_third_footer,
                title_fourth_menu,
                phone_number,
                email,
                android_link,
                ios_link,
                slider_delay,
                launching_status,
                launching_title,
                launching_description,
            });

            if(updateSetting){
                req.flash('messages', SettingsMessage.UPDATED);
                res.redirect("/setting");
            }
            

        } catch (error) {
            req.flash('errors', error.message)
            next(error)
        }
    }

}

module.exports = new SettingsController();
  