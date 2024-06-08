const autoBind = require("auto-bind");
const blog_categoryService = require("./blog_category.service");
const SettingsService = require("../setting/setting_service");
const {
    UniqueCode,
    convertGregorianDateToPersionDateToToday,
} = require("../../../common/utills/public.function");
const { CODE_NAME } = require("../../../common/utills/constrant");
const BlogCategoryModel = require("./blog_category_model");
const blogCategoryMessage = require("./blog_category.message");

class BlogCategoryController {
    #service;
    #setting_service;
    #blogCategoryModel;

    constructor() {
        autoBind(this);
        this.#service = blog_categoryService;
        this.#setting_service = SettingsService;
        this.#blogCategoryModel = BlogCategoryModel;
    };

    async listOfBlogCategory(req, res, next) {
        try {
            const { search, parent } = req.query;
            let listOfBlogCategory,
                blogCategoryCount = 0,
                showTable = false;
            if (search && parent == "") {
                listOfBlogCategory = await this.#blogCategoryModel
                    .find({
                        $text: { $search: search },
                    })
                    .populate([{ path: "parent" }]);
                blogCategoryCount = await this.#blogCategoryModel
                    .find({
                        $text: { $search: search },
                    })
                    .populate([{ path: "parent" }])
                    .countDocuments();
            } else if(parent && search == ""){
                listOfBlogCategory = await this.#blogCategoryModel.find({
                    parent: parent,
                }).populate([
                    {path: "parent"}
                ]);
                blogCategoryCount = await this.#blogCategoryModel.find({
                    parent: parent,
                }).populate([
                    {path: "parent"}
                ]).countDocuments();
            } else if(search && parent){
                listOfBlogCategory = await this.#blogCategoryModel.find({
                    $text: { $search: search },
                    parent: parent,                    
                }).populate([
                    {path: "parent"}
                ]);
                blogCategoryCount = await this.#blogCategoryModel.find({
                    $text: { $search: search },
                    parent: parent, 
                }).populate([
                    {path: "parent"}
                ]).countDocuments();
            } else if(search == "" && parent == ""){
                listOfBlogCategory = await this.#blogCategoryModel.find({}).populate([
                    {path: "parent"}
                ]);
                blogCategoryCount = await this.#blogCategoryModel.find({}).populate([
                    {path: "parent"}
                ]).countDocuments();
            } else {
                listOfBlogCategory = await this.#blogCategoryModel.find({}).populate([
                    {path: "parent"}
                ]);
                blogCategoryCount = await this.#blogCategoryModel.find({}).countDocuments().populate([
                    {path: "parent"}
                ]);
            }

            if (blogCategoryCount == 0) {
                showTable = false;
            } else {
                showTable = true;
            }

            const getParentBlogCategory = await this.#service.listOfBlogCategory();

            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/blogs_category/blogs_category_list.ejs",
                {
                    listOfBlogCategory,
                    blogCategoryCount,
                    showTable,
                    setting,
                    getParentBlogCategory
                }
            );
        } catch (error) {
            next(error);
        }
    };
    async getCreateOfBlogCategory(req, res, next) {
        try {
            const setting = await this.#setting_service.listOfSetting();
            const code = await UniqueCode(
                CODE_NAME.BLOG_CATEGORY,
                this.#blogCategoryModel
            );
            const blogCategory = await this.#service.listOfBlogCategory();

            res.render(
                "./pages/dashboard/blogs_category/blogs_category_add.ejs",
                {
                    setting,
                    messages: req.flash("messages"),
                    errors: req.flash("errors"),
                    code,
                    blogCategory,
                }
            );
        } catch (error) {
            next(error);
        }
    };
    async postCreateOfBlogCategory(req, res, next) {
        try {
            const {
                code,
                title,
                slug,
                parent,
                show_in_archive,
                priority,
                icon,
            } = req.body;
            const createdTime = convertGregorianDateToPersionDateToToday();
            const updatedTime = convertGregorianDateToPersionDateToToday();
            await this.#service.createBlogCategory(req, {
                code,
                title,
                slug,
                parent,
                show_in_archive,
                priority,
                icon,
                createdAt: createdTime,
                updatedAt: updatedTime,
            });
            res.locals.layout =
                "./pages/dashboard/blogs_category/blogs_category_add.ejs";
            req.flash("messages", blogCategoryMessage.created);
            return res.redirect("/add");
        } catch (error) {
            req.flash("errors", error.message);
            next(error);
        }
    };
    async getUpdateOfBlogCategory(req, res, next){
        try {

            const {code} = req.params;
            const blogCategory = await this.#service.listOfBlogCategoryByCode(code);
            const getParentBlogCategory = await this.#service.listOfBlogCategory();
            
            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/blogs_category/blogs_category_update.ejs", {
                setting,
                blogCategory,
                getParentBlogCategory,
                messages: req.flash('messages'),
                errors: req.flash('errors')
            })
        } catch (error) {
            next(error)
        }
    }
    async postUpdateOfBlogCategory(req, res, next){
        try {

            const {code} = req.params;
            const {
                title,
                slug,
                parent,
                show_in_archive,
                priority,
                icon,
            } = req.body;
            await this.#service.updateBlogCategory(code, {
                title,
                slug,
                parent,
                show_in_archive,
                priority,
                icon
            });
            res.locals.layout =
                "./pages/dashboard/blogs_category/blogs_category_update.ejs";
            req.flash("messages", blogCategoryMessage.updated);
            return res.redirect("/update");

        } catch (error) {
            req.flash('errors', error.message)
            next(error)
        }
    }
}

module.exports = new BlogCategoryController();
