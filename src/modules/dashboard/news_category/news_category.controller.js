const auto_bind = require("auto-bind");
const NewsCategoryService = require("./news_category.service");
const SettingsService = require("../setting/setting_service");
const {
    UniqueCode,
    convertGregorianDateToPersionDateToToday,
} = require("../../../common/utills/public.function");
const { CODE_NAME } = require("../../../common/utills/constrant");
const NewsCategoryModel = require("./news_category.model");
const newsCategoryMessage = require("./news_category.message");

class NewsCategoryController {
    #service;
    #setting_service;
    #newsCategoryModel;
    constructor() {
        auto_bind(this);
        this.#service = NewsCategoryService;
        this.#setting_service = SettingsService;
        this.#newsCategoryModel = NewsCategoryModel;
    };
   
    async newsCategoryList(req, res, next) {
        try {
            const { search, parent } = req.query;
            let listOfNewsCategory,
                newsCategoryCount,
                showTable = false;
            if (search && parent == "") {
                listOfNewsCategory = await this.#newsCategoryModel
                    .find({
                        $text: { $search: search },
                    })
                    .populate([{ path: "parent" }]);
                newsCategoryCount = await this.#newsCategoryModel
                    .find({
                        $text: { $search: search },
                    })
                    .populate([{ path: "parent" }])
                    .countDocuments();
            } else if (parent && search == "") {
                listOfNewsCategory = await this.#newsCategoryModel
                    .find({
                        parent: parent,
                    })
                    .populate([{ path: "parent" }]);
                newsCategoryCount = await this.#newsCategoryModel
                    .find({
                        parent: parent,
                    })
                    .populate([{ path: "parent" }])
                    .countDocuments();
            } else if (search && parent) {
                listOfNewsCategory = await this.#newsCategoryModel
                    .find({
                        $text: { $search: search },
                        parent: parent,
                    })
                    .populate([{ path: "parent" }]);
                newsCategoryCount = await this.#newsCategoryModel
                    .find({
                        $text: { $search: search },
                        parent: parent,
                    })
                    .populate([{ path: "parent" }])
                    .countDocuments();
            } else if (search == "" && parent == "") {
                listOfNewsCategory = await this.#newsCategoryModel
                    .find({})
                    .populate([{ path: "parent" }]);
                newsCategoryCount = await this.#newsCategoryModel
                    .find({})
                    .populate([{ path: "parent" }])
                    .countDocuments();
            } else {
                listOfNewsCategory = await this.#newsCategoryModel
                    .find({})
                    .populate([{ path: "parent" }]);
                newsCategoryCount = await this.#newsCategoryModel
                    .find({})
                    .countDocuments()
                    .populate([{ path: "parent" }]);
            }

            if (listOfNewsCategory == 0) {
                showTable = false;
            } else {
                showTable = true;
            }
            const newsCategory = await this.#service.listOfNewsCategory();


            const setting = await this.#setting_service.listOfSetting();

            res.render(
                "./pages/dashboard/news_category/news_category_list.ejs",
                {
                    newsCategory,
                    setting,
                    listOfNewsCategory,
                    newsCategoryCount,
                    showTable
                }
            );
        } catch (error) {
            next(error);
        }
    };
    async getCreatenewsCategory(req, res, next) {
        try {
            const code = await UniqueCode(
                CODE_NAME.NEWS_CATEGORY,
                this.#newsCategoryModel
            );
            const listOfnewsCategory = await this.#service.listOfNewsCategory();

            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/news_category/news_category_add.ejs",
                {
                    code,
                    listOfnewsCategory,
                    setting,
                    messages: req.flash("messages"),
                    errors: req.flash("errors"),
                }
            );
        } catch (error) {
            next(error);
        }
    };
    async postCreatenewsCategory(req, res, next) {
        try {
            const {
                code,
                title,
                slug,
                description,
                tags,
                parent,
                show_in_archive,
                priority,
            } = req.body;
            const craeteTime = convertGregorianDateToPersionDateToToday();
            const updateTime = convertGregorianDateToPersionDateToToday();

            await this.#service.createNewsCategory(req, {
                code,
                title,
                slug,
                description,
                tags,
                parent,
                show_in_archive,
                priority,
                createdAt: craeteTime,
                updatedAt: updateTime,
            });

            res.locals.layout =
                "./pages/dashboard/news_category/news_category_add.ejs";
            req.flash("messages", newsCategoryMessage.created);
            return res.redirect("/add");
        } catch (error) {
            req.flash("errors", error.message);
            next(error);
        }
    };
    async getUpdateNewsCategory(req, res, next){
        try {
            const { code } = req.params;

            const newsCategory = await this.#service.listOfNewsCategoryByCode(code)
            const getParentNewsCategory = await this.#service.listOfNewsCategory();

            const setting = await this.#setting_service.listOfSetting();
            res.render( "./pages/dashboard/news_category/news_category_update.ejs",{
                newsCategory,
                getParentNewsCategory,
                setting,
                errors: req.flash("errors"),
                messages: req.flash('messages')
            })
        } catch (error) {
            next(error)
        }
    }
    async postUpdateNewsCategory(req, res, next){
        try {
            const { code } = req.params;
            const { 
                title,
                slug,
                description,
                tags,
                parent,
                show_in_archive,
                priority,
            } = req.body;
            await this.#service.updateNewsCatgory(code, req, { 
                title,
                slug,
                description,
                tags,
                parent,
                show_in_archive,
                priority,
            });
            res.locals.layout =
                "./pages/dashboard/news_category/news_category_update.ejs";
            req.flash("messages", newsCategoryMessage.updated);
            return res.redirect("/upadte");

            
        } catch (error) {
            req.flash('errors', error.message)
            next(error)
        }
    }
}

module.exports = new NewsCategoryController();
