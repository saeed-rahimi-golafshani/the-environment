const auto_bind = require("auto-bind");
const NewsCategoryService = require("./news_category.service");

class NewsCategoryController{
    #service;
    constructor(){
        auto_bind(this);
        this.#service = NewsCategoryService
    }
    async newsCategoryList(req, res, next){
        try {

            res.render("./pages/dashboard/news_category/news_category_list.ejs", {
               
            });
        } catch (error) {
            next(error)
        }
    }
    async getCreatenewsCategory(req, res, next){
        try {
            
            res.render("./pages/dashboard/news_category/news_category_add.ejs", {
               
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new NewsCategoryController()