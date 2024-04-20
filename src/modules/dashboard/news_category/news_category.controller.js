const auto_bind = require("auto-bind");
const NewsCategoryService = require("./news_category.service");
const SettingsService = require("../setting/setting_service");

class NewsCategoryController {
    #service;
    #setting_service;
    constructor() {
        auto_bind(this);
        this.#service = NewsCategoryService;
        this.#setting_service = SettingsService;
    }
    async newsCategoryList(req, res, next) {
        try {
            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/news_category/news_category_list.ejs",
                {
                    setting,
                }
            );
        } catch (error) {
            next(error);
        }
    }
    async getCreatenewsCategory(req, res, next) {
        try {
            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/news_category/news_category_add.ejs",
                {
                    setting,
                }
            );
        } catch (error) {
            next(error);
        }
    }
    async getCreatenewsCategory(req, res, next) {
        try {
            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/news_category/news_category_add.ejs",
                {
                    setting,
                }
            );
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new NewsCategoryController();
