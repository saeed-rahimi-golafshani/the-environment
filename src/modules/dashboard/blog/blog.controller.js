const autoBind = require("auto-bind");
const BlogService = require("./blog.service");
const SettingsService = require("../setting/setting_service");
const { CODE_NAME } = require("../../../common/utills/constrant");
const { UniqueCode, convertGregorianDateToPersionDateToToday } = require("../../../common/utills/public.function");
const blogModel = require("./blog_model");
const blogMessage = require("./blog.messages");
const BlogCategoryService = require("../blog_category/blog_category.service")

class BlogController {
    #service;
    #setting_service;
    #blogModel;
    #blogCategoryService;

    constructor() {
        autoBind(this);
        this.#service = BlogService;
        this.#setting_service = SettingsService;
        this.#blogModel = blogModel;
        this.#blogCategoryService = BlogCategoryService;
    }

    async blogsOFList(req, res, next) {
        try {

            const { search, blogCategory, blogType, publishedStatus } = req.query;
           
            let showTable = false;
            let blog, blogCount = 0;
            if (search && blogCategory == "" &&  blogType == "" && publishedStatus == "") {
                blog = await this.#blogModel.find({$text: { $search: search }}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({$text: { $search: search }}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            } else if (search =="" && blogCategory && blogType == "" && publishedStatus == "") {
                blog = await this.#blogModel.find({blog_category_id: blogCategory}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({blog_category_id: blogCategory}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            } else if (search =="" && blogCategory =="" && blogType && publishedStatus == "") {
                blog = await this.#blogModel.find({blog_type: blogType}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({blog_type: blogType}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            } else if (search =="" && blogCategory =="" && blogType == "" && publishedStatus) {
                blog = await this.#blogModel.find({published_status: publishedStatus}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({published_status: publishedStatus}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            } else if (search && blogCategory && blogType == "" && publishedStatus == "") {
                blog = await this.#blogModel.find({$text: { $search: search }, blog_category_id: blogCategory}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({$text: { $search: search }, blog_category_id: blogCategory}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            } else if (search && blogCategory == "" && blogType && publishedStatus == "") {
                blog = await this.#blogModel.find({$text: { $search: search }, blog_type: blogType}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({$text: { $search: search }, blog_type: blogType}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            } else if (search && blogCategory == "" && blogType == "" && publishedStatus) {
                blog = await this.#blogModel.find({$text: { $search: search }, published_status: publishedStatus}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({$text: { $search: search }, published_status: publishedStatus}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            } else if (search == "" && blogCategory && blogType && publishedStatus == "") {
                blog = await this.#blogModel.find({blog_category_id: blogCategory, blog_type: blogType}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({blog_category_id: blogCategory, blog_type: blogType}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            } else if (search == "" && blogCategory && blogType == "" && publishedStatus) {
                blog = await this.#blogModel.find({blog_category_id: blogCategory, published_status: publishedStatus}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({blog_category_id: blogCategory, published_status: publishedStatus}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            } else if (search == "" && blogCategory == "" && blogType && publishedStatus) {
                blog = await this.#blogModel.find({blog_type: blogType, published_status: publishedStatus}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({blog_type: blogType, published_status: publishedStatus}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            } else if (search && blogCategory && blogType && publishedStatus == "") {
                blog = await this.#blogModel.find({$text: { $search: search }, blog_category_id: blogCategory, blog_type: blogType}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({$text: { $search: search }, blog_category_id: blogCategory, blog_type: blogType}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            } else if (search && blogCategory == "" && blogType && publishedStatus) {
                blog = await this.#blogModel.find({$text: { $search: search }, published_status: publishedStatus, blog_type: blogType}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({$text: { $search: search }, published_status: publishedStatus, blog_type: blogType}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            } else if (search && blogCategory && blogType == "" && publishedStatus) {
                blog = await this.#blogModel.find({$text: { $search: search }, published_status: publishedStatus, blog_category_id: blogCategory}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({$text: { $search: search }, published_status: publishedStatus, blog_category_id: blogCategory}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            } else if (search == "" && blogCategory && blogType && publishedStatus) {
                blog = await this.#blogModel.find({blog_type: blogType, published_status: publishedStatus, blog_category_id: blogCategory}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({blog_type: blogType, published_status: publishedStatus, blog_category_id: blogCategory}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            } else if (search && blogCategory && blogType && publishedStatus) {
                blog = await this.#blogModel.find({$text: { $search: search },blog_type: blogType, published_status: publishedStatus, blog_category_id: blogCategory}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({$text: { $search: search },blog_type: blogType, published_status: publishedStatus, blog_category_id: blogCategory}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            } else if (search == "" && blogCategory == "" && blogType == "" && publishedStatus == "") {
                blog = await this.#blogModel.find({}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            } else {
                blog = await this.#blogModel.find({}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]);
                blogCount = await this.#blogModel.find({}).populate([
                    {path: "blog_category_id"},
                    {path: "file"}
                ]).countDocuments();
            }          

            if (blogCount == 0) {
                showTable = false;
            } else {
                showTable = true;
            }




            const blogCategories = await this.#blogCategoryService.listOfBlogCategory();

            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/blogs/blog_list.ejs", {
                setting,
                blogCategories,
                blog,
                blogCount,
                showTable
            });
        } catch (error) {
            next(error);
        }
    }
    async getCreateBlog(req, res, next) {
        try {
            const code = await UniqueCode(CODE_NAME.BLOG, this.#blogModel);

            const blogs = await this.#service.listOfBlogs();
            const blogCategory = await this.#blogCategoryService.listOfBlogCategory();
            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/blogs/blog_add.ejs", {
                code,
                blogs,
                blogCategory,
                setting,
                messages: req.flash('messages'),
                errors: req.flash('errors')
            });
        } catch (error) {
            next(error);
        }
    }
    async postCrateBlog(req, res, next) {
        try {
            let craeteTime, updateTime;
            const {
                code,
                blog_category_id,
                title,
                slug,
                short_text,
                text,
                tags,
                blog_type,
                published_time,
                published_status,
            } = req.body;
            craeteTime = convertGregorianDateToPersionDateToToday();
            updateTime = convertGregorianDateToPersionDateToToday();
            await this.#service.craeteBlog(req, {
                code,
                blog_category_id,
                title,
                slug,
                short_text,
                text,
                tags,
                blog_type,
                published_time,
                published_status,
                createdAt: craeteTime,
                updatedAt: updateTime,
            })
            res.locals.layout =
                "./pages/dashboard/blogs/blog_add.ejs";
            req.flash("messages", blogMessage.created);
            return res.redirect("/add");

        } catch (error) {
            req.flash('errors', error.message)
            next(error);
        }
    }
}

module.exports = new BlogController();
