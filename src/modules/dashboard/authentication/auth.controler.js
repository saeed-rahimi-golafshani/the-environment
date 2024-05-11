const auto_bind = require("auto-bind");
const AuthService = require("./auth.service");
const { convertGregorianDateToPersionDateToToday } = require("../../../common/utills/public.function");
const AuthMessage = require("./auth.message");

class AuthenticationController{
    #service;
    constructor(){
        this.#service = AuthService;
    }

    async sendOtp(req, res, next){
        try {
            const { mobile } = req.body;
            const createTime = convertGregorianDateToPersionDateToToday();
            const updateTime = convertGregorianDateToPersionDateToToday();
            await this.#service.sendOtp(req, {mobile, createdAt: createTime, updatedAt: updateTime})
            res.locals.layout = "./pages/website/login/login.ejs";           
        } catch (error) {
            req.flash("errors", error.message);
            next(error)
        }
    }
}

module.exports = new AuthenticationController()