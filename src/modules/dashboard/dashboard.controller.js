const auto_bind = require("auto-bind");

class DashboardController{

    constructor(){
        auto_bind(this);
    }
    async listOfUserPage(req, res, next){
        try {
            
            res.render("./pages/dashboard/index.ejs", {
                
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new DashboardController()