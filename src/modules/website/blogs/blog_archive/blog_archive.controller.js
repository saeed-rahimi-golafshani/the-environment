const auto_bind = require("auto-bind");
const SettingsService = require("../../../dashboard/setting/setting_service");
const BlogCategoryService = require("../../../dashboard/blog_category/blog_category.service");

class BlogArchiveController{
    #service;
    #setting_service;
    #blogCategory_Service;
    constructor(){
        auto_bind(this);
        this.#setting_service = SettingsService;
        this.#blogCategory_Service = BlogCategoryService;

    }
    async BlogArchivePage(req, res, next){
        try {
            const { code, slug } = req.params;
            let page, perPage, skip;
            let setting,getTwoLine, listOfBlogCategoryParent, listOfBlogCategoryByParent, listOfBlogArchive, listOgBlogCategoryByCode; 

            page = parseInt(req.query.page) || 1;
            perPage = parseInt(req.query.perPage) || 9;
            skip = (page - 1) * perPage;

            setting = await this.#setting_service.listOfSetting();
            getTwoLine = await this.#setting_service.getLineDescription();

            listOfBlogCategoryParent = await this.#blogCategory_Service.listOfBlogCategoryWitoutParent();
            listOfBlogCategoryByParent = await this.#blogCategory_Service.listOfBlogCategoryByParent();
            listOfBlogArchive = await this.#blogCategory_Service.listOfBlogArchiveByCode(code, perPage, skip);
            listOgBlogCategoryByCode = await this.#blogCategory_Service.listOfBlogCategoryByCode(code);
           
          
            
           
            res.locals.layout = "./layouts/website/blog/main.ejs";
            res.render("./pages/website/blog/index.ejs", {
                setting,
                getTwoLine,
                listOfBlogCategoryParent,
                listOfBlogCategoryByParent,
                listOfBlogArchive,
                page,
                perPage,
                code,
                slug,
                listOgBlogCategoryByCode
                // date_now
            });
        } catch (error) { 
            next(error)
        }
    };
    
    
}

module.exports = new BlogArchiveController()