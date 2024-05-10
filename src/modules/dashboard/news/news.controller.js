const autoBind = require("auto-bind");
const NewsService = require("./news.service");
const SettingsService = require("../setting/setting_service");
const { CODE_NAME } = require("../../../common/utills/constrant");
const NewsModel = require("./news.model");
const {
    UniqueCode,
    convertGregorianDateToPersionDateToToday,
} = require("../../../common/utills/public.function");
const newsMessage = require("./news.message");
const NewsCategoryService = require("../news_category/news_category.service");

class NewsController {
    #service;
    #setting_service;
    #newsModel;
    #newsCategoryService;

    constructor() {
        autoBind(this);
        this.#service = NewsService;
        this.#setting_service = SettingsService;
        this.#newsModel = NewsModel;
        this.#newsCategoryService = NewsCategoryService;
    }

    async listOfNews(req, res, next) {
        try {
            const { search, newsCategory, breakingNews, publishedStatus } =
                req.query;

            let showTable = false;
            let news,
                newsCount = 0;
            if (
                search &&
                newsCategory == "" &&
                breakingNews == "" &&
                publishedStatus == ""
            ) {
                news = await this.#newsModel
                    .find({ $text: { $search: search } })
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({ $text: { $search: search } })
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            } else if (
                search == "" &&
                newsCategory &&
                breakingNews == "" &&
                publishedStatus == ""
            ) {
                news = await this.#newsModel
                    .find({ news_category_id: newsCategory })
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({ news_category_id: newsCategory })
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            } else if (
                search == "" &&
                newsCategory == "" &&
                breakingNews &&
                publishedStatus == ""
            ) {
                news = await this.#newsModel
                    .find({ breaking_news: breakingNews })
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({ breaking_news: breakingNews })
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            } else if (
                search == "" &&
                newsCategory == "" &&
                breakingNews == "" &&
                publishedStatus
            ) {
                news = await this.#newsModel
                    .find({ published_status: publishedStatus })
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({ published_status: publishedStatus })
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            } else if (
                search &&
                newsCategory &&
                breakingNews == "" &&
                publishedStatus == ""
            ) {
                news = await this.#newsModel
                    .find({
                        $text: { $search: search },
                        news_category_id: newsCategory,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({
                        $text: { $search: search },
                        news_category_id: newsCategory,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            } else if (
                search &&
                newsCategory == "" &&
                breakingNews &&
                publishedStatus == ""
            ) {
                news = await this.#newsModel
                    .find({
                        $text: { $search: search },
                        breaking_news: breakingNews,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({
                        $text: { $search: search },
                        breaking_news: breakingNews,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            } else if (
                search &&
                newsCategory == "" &&
                breakingNews == "" &&
                publishedStatus
            ) {
                news = await this.#newsModel
                    .find({
                        $text: { $search: search },
                        published_status: publishedStatus,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({
                        $text: { $search: search },
                        published_status: publishedStatus,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            } else if (
                search == "" &&
                newsCategory &&
                breakingNews &&
                publishedStatus == ""
            ) {
                news = await this.#newsModel
                    .find({
                        news_category_id: newsCategory,
                        breaking_news: breakingNews,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({
                        news_category_id: newsCategory,
                        breaking_news: breakingNews,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            } else if (
                search == "" &&
                newsCategory &&
                breakingNews == "" &&
                publishedStatus
            ) {
                news = await this.#newsModel
                    .find({
                        news_category_id: newsCategory,
                        published_status: publishedStatus,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({
                        news_category_id: newsCategory,
                        published_status: publishedStatus,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            } else if (
                search == "" &&
                newsCategory == "" &&
                breakingNews &&
                publishedStatus
            ) {
                news = await this.#newsModel
                    .find({
                        breaking_news: breakingNews,
                        published_status: publishedStatus,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({
                        breaking_news: breakingNews,
                        published_status: publishedStatus,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            } else if (
                search &&
                newsCategory &&
                breakingNews &&
                publishedStatus == ""
            ) {
                news = await this.#newsModel
                    .find({
                        $text: { $search: search },
                        news_category_id: newsCategory,
                        breaking_news: breakingNews,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({
                        $text: { $search: search },
                        news_category_id: newsCategory,
                        breaking_news: breakingNews,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            } else if (
                search &&
                newsCategory == "" &&
                breakingNews &&
                publishedStatus
            ) {
                news = await this.#newsModel
                    .find({
                        $text: { $search: search },
                        published_status: publishedStatus,
                        breaking_news: breakingNews,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({
                        $text: { $search: search },
                        published_status: publishedStatus,
                        breaking_news: breakingNews,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            } else if (
                search &&
                newsCategory &&
                breakingNews == "" &&
                publishedStatus
            ) {
                news = await this.#newsModel
                    .find({
                        $text: { $search: search },
                        published_status: publishedStatus,
                        news_category_id: newsCategory,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({
                        $text: { $search: search },
                        published_status: publishedStatus,
                        news_category_id: newsCategory,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            } else if (
                search == "" &&
                newsCategory &&
                breakingNews &&
                publishedStatus
            ) {
                news = await this.#newsModel
                    .find({
                        breaking_news: breakingNews,
                        published_status: publishedStatus,
                        news_category_id: newsCategory,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({
                        breaking_news: breakingNews,
                        published_status: publishedStatus,
                        news_category_id: newsCategory,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            } else if (
                search &&
                newsCategory &&
                breakingNews &&
                publishedStatus
            ) {
                news = await this.#newsModel
                    .find({
                        $text: { $search: search },
                        breaking_news: breakingNews,
                        published_status: publishedStatus,
                        news_category_id: newsCategory,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({
                        $text: { $search: search },
                        breaking_news: breakingNews,
                        published_status: publishedStatus,
                        news_category_id: newsCategory,
                    })
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            } else if (
                search == "" &&
                newsCategory == "" &&
                breakingNews == "" &&
                publishedStatus == ""
            ) {
                news = await this.#newsModel
                    .find({})
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({})
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            } else {
                news = await this.#newsModel
                    .find({})
                    .populate([{ path: "news_category_id" }, { path: "file" }]);
                newsCount = await this.#newsModel
                    .find({})
                    .populate([{ path: "news_category_id" }, { path: "file" }])
                    .countDocuments();
            }

            if (newsCount == 0) {
                showTable = false;
            } else {
                showTable = true;
            }

            const newsCategories =
                await this.#newsCategoryService.listOfNewsCategory();

            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/news/news_list.ejs", {
                news,
                newsCount,
                showTable,
                setting,
                newsCategories,
            });
        } catch (error) {
            next(error);
        }
    }
    async getCreateNews(req, res, next) {
        try {
            const code = await UniqueCode(CODE_NAME.NEWS, this.#newsModel);
            const news = await this.#service.listOfNews();
            const newsCategories =
                await this.#newsCategoryService.listOfNewsCategory();

            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/news/news_add.ejs", {
                code,
                news,
                newsCategories,
                setting,
                messages: req.flash("messages"),
                errors: req.flash("errors"),
            });
        } catch (error) {
            next(error);
        }
    }
    async postCreateNews(req, res, next) {
        try {
            const {
                code,
                foreword,
                title,
                slug,
                news_category_id,
                short_text,
                text,
                tags,
                source,
                published_status,
                published_time,
                breaking_news,
            } = req.body;
            const craeteTime = convertGregorianDateToPersionDateToToday();
            const updateTime = convertGregorianDateToPersionDateToToday();
            await this.#service.createNews(req, {
                code,
                foreword,
                title,
                slug,
                news_category_id,
                short_text,
                text,
                tags,
                source,
                published_status,
                published_time,
                breaking_news,
                createdAt: craeteTime,
                updatedAt: updateTime,
            });
            res.locals.layout = "./pages/dashboard/news/news_add.ejs";
            req.flash("messages", newsMessage.created);
            return res.redirect("/add");
        } catch (error) {
            req.flash("errors", error.message);
            next(error);
        }
    }
    async getUpdateNews(req, res, next){
        try {
            const { code } = req.params;

            const news = await this.#service.listOfNewsByCode(code);
            const newsCategories = await this.#newsCategoryService.listOfNewsCategory();
            const setting = await this.#setting_service.listOfSetting(); 
            res.render("./pages/dashboard/news/news_update.ejs", {
                news,
                newsCategories,
                setting,
                messages: req.flash('messages'),
                errors: req.flash('errors')
            })
        } catch (error) {
            next(error)
        }
    }
    async postUpdateNews(req, res, next){
        try {
            const { code } = req.params;
            const { 
                foreword,
                title,
                slug,
                news_category_id,
                short_text,
                text,
                tags,
                source,
                published_status,
                published_time,
                breaking_news,

            } = req.body;
            await this.#service.updateNews(code, req, {
                foreword,
                title,
                slug,
                news_category_id,
                short_text,
                text,
                tags,
                source,
                published_status,
                published_time,
                breaking_news,
            });
            res.locals.layout = "./pages/dashboard/news/news_update.ejs";
            req.flash("messages", newsMessage.updated);
            return res.redirect("/update");

        } catch (error) {
            req.flash("errors", error.message)
            next(error)
        }
    }
}

module.exports = new NewsController();
