const auto_bind = require("auto-bind");
const HomeService = require("./home.service");

class HomeController{
    #service
    constructor(){
        auto_bind(this);
        this.#service = HomeService;

    }
    async HomePage(req, res, next){
        try {
         
            res.locals.layout = "./layouts/website/home/main.ejs";
            res.render("./pages/website/home/index.ejs", {
             
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new HomeController()