const auto_bind = require("auto-bind");
const SettingsService = require("../../dashboard/setting/setting_service");
const LoginService = require("./login.service");
const { convertGregorianDateToPersionDateToToday, UniqueCode } = require("../../../common/utills/public.function");
const CookieNames = require("../../../common/utills/cookie.enum");
const Node_Env = require("../../../common/utills/env.enum");
const { CODE_NAME } = require("../../../common/utills/constrant");
const UserModel = require("../../dashboard/user/user_model");

class LoginController{
    #setting_service;
    #service;
    #userModel;

    constructor(){
        auto_bind(this);
        this.#setting_service = SettingsService;
        this.#service = LoginService;
        this.#userModel = UserModel;
    }
    async registerPage(req, res, next){
        try {
            const code = await UniqueCode(CODE_NAME.USER, this.#userModel);
            let setting, getTwoLine
            getTwoLine = await this.#setting_service.getLineDescription();
            setting = await this.#setting_service.listOfSetting();
            res.locals.layout = "./layouts/website/login/main.ejs";
                res.render("./pages/website/login/register.ejs", {
                    code,
                    setting,
                    getTwoLine,
                    messages: req.flash("messages"),
                    errors: req.flash("errors"),
                })
        } catch (error) {
            next(error)
        }
    }
    async postRegister(req, res, next){
        try {
            const { mobile, user_code } = req.body;
            const createTime = convertGregorianDateToPersionDateToToday();
            const updateTime = convertGregorianDateToPersionDateToToday();
            await this.#service.sendOtp(req, {code: user_code, mobile, createdAt: createTime, updatedAt: updateTime})
            res.locals.layout = "./pages/website/login/register.ejs";

        } catch (error) {
            req.flash("errors", error.message);
            next(error)
        }
    }
    async loginPage(req, res, next){
        try {
            let getTwoLine, setting;
            getTwoLine = await this.#setting_service.getLineDescription();
            setting = await this.#setting_service.listOfSetting();
            res.locals.layout = "./layouts/website/login/main.ejs";
            res.render("./pages/website/login/login.ejs", {
                getTwoLine,
                setting,
                messages: req.flash("messages"),
                errors: req.flash("errors")
            });
        } catch (error) {
            next(error)
        }
    }
    async postLogin(req, res, next){
        try {
            const { mobile, code } = req.body;
            
            const token = await this.#service.checkOtp(mobile, code, req);
            console.log(token);
            console.log(res.cookie);
            const cookie = res.cookie(CookieNames.AccessToken, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === Node_Env.Production
            });
            res.locals.layout = "./layouts/website/login/main.ejs";
            res.render("./pages/website/login/login.ejs", {
                cookie
            });
            
        } catch (error) {
            req.flash("errors", error.message);
            next(error)
        }
    }
    async logOut(req, res, next){
        try {
            
          res.clearCookie(CookieNames.AccessToken);
          res.redirect("/");
         
        } catch (error) {
          next(error)
        }
      }
}

module.exports = new LoginController()