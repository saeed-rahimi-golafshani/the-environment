const auto_bind = require("auto-bind");
const HomeService = require("./home.service");
const SettingsService = require("../../dashboard/setting/setting_service");
const BlogCategoryService = require("../../dashboard/blog_category/blog_category.service")

class HomeController{
    #service;
    #setting_service;
    #blogCategory_Service;
    constructor(){
        auto_bind(this);
        this.#service = HomeService;
        this.#setting_service = SettingsService;
        this.#blogCategory_Service = BlogCategoryService

    }
    async HomePage(req, res, next){
        try {
            let setting,getTwoLine, listOfBlogCategoryParent, listOfBlogCategoryByParent;
            setting = await this.#setting_service.listOfSetting();
            getTwoLine = await this.#setting_service.getLineDescription();
            listOfBlogCategoryParent = await this.#blogCategory_Service.listOfBlogCategoryWitoutParent();
            listOfBlogCategoryByParent = await this.#blogCategory_Service.listOfBlogCategoryByParent();
            

            if(setting.launching_status == true){
                res.locals.layout = "./layouts/website/static_page/main.ejs";
                res.render("./pages/website/coming_soon/coming-soon.ejs", {
                    setting,
                    getTwoLine
                })
            } else if(setting.launching_status == false){
                res.locals.layout = "./layouts/website/home/main.ejs";
                res.render("./pages/website/home/index.ejs", {
                 setting,
                 getTwoLine,
                 listOfBlogCategoryParent,
                 listOfBlogCategoryByParent
                });
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new HomeController()