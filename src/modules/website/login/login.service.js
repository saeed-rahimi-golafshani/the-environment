const auto_bind = require("auto-bind");
const UserModel = require("../../dashboard/user/user_model");
const ip = require("ip");
const { sendOtpSchema, checkOtpSchema } = require("./login.validation");
const { randomInt } = require("crypto");
const createHttpError = require("http-errors");
const AuthMessage = require("./login.message");
const ActivationModel = require("../../dashboard/activation/activation_model");
const {
    convertGregorianDateToPersionDateToToday,
} = require("../../../common/utills/public.function");
const jwt = require("jsonwebtoken");
const LoginModel = require("../../dashboard/login/login_model");
const BrowserModel = require("../../dashboard/browser/browser_model");
require("dotenv").config();

class LoginService {
    #model;
    #activationModel;
    #loginModel;
    #browserModel;

    constructor() {
        auto_bind(this);
        this.#model = UserModel;
        this.#activationModel = ActivationModel;
        this.#loginModel = LoginModel;
        this.#browserModel = BrowserModel;
    }
    async sendOtp(req, sendOtpDto) {
        let user, now, otp, newUser, createTime, updateTime;
        createTime = convertGregorianDateToPersionDateToToday();
        updateTime = convertGregorianDateToPersionDateToToday();
        await sendOtpSchema.validateAsync(req.body);
        now = new Date().getTime();
        otp = {
            code: randomInt(10000, 99999),
            expiresIn: now + 1000 * 60,
        };
        user = await this.#model.findOne({ mobile: sendOtpDto.mobile });
        if (!user) {
            newUser = await this.#model.create(sendOtpDto);
            if (!newUser)
                throw new createHttpError.InternalServerError(
                    AuthMessage.internalServerError
                );
            await this.#activationModel.create({
                user_id: newUser._id,
                otp,
                createdAt: createTime,
                updatedAt: updateTime,
            });
            return newUser;
        }
        const userActivation = await this.#activationModel.findOne({
            user_id: user._id,
        });
        if (userActivation.otp && userActivation.otp.expiresIn > now) {
            throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired);
        }
        userActivation.otp = otp;
        userActivation.updatedAt = updateTime;
        await userActivation.save();
        await user.save();
        console.log(userActivation.otp.code);
        return user;
    }

    async checkOtp(mobile, code, req) {
        await checkOtpSchema.validateAsync(req.body);
        const user = await this.checkExistUserByMobile(mobile);
        const userActivation = await this.#activationModel.findOne({
            user_id: user._id,
        });

        const now = new Date().getTime();
        if (userActivation?.otp?.expiresIn < now)
            throw new createHttpError.Unauthorized(AuthMessage.otpCodeExpired);
        if (userActivation?.otp?.code != code)
            throw new createHttpError.Unauthorized(
                AuthMessage.otpCodeIsNotIncorrect
            );
        if (!user.access_profile) user.access_profile = true;
        if (!user.Phone_verification) user.Phone_verification = true;
        user.save();
        const accessToken = this.signToken({ mobile, id: user._id });
        
        if (accessToken) {
            const checkLogin = await this.#loginModel.findOne({
                user_id: user._id,
            });
            const checkBrowser = await this.#browserModel.findOne({
                user_id: user._id,
            });
            const ip_number = ip.address();
            const updateTime = convertGregorianDateToPersionDateToToday();
            const createTime = convertGregorianDateToPersionDateToToday();
            let userAgent = {
                browser: req.useragent.browser,
                version: req.useragent.version,
                os: req.useragent.os,
                platform: req.useragent.platform,
                source: req.useragent.source,
                geo_ip: req.useragent.geoIp,
                is_mobile: req.useragent.isMobile,
                is_desktop: req.useragent.isDesktop,
            };
            req.headers.useragent = userAgent;
            if (checkBrowser) {
                const browserDelete = await this.#browserModel.deleteOne({
                    user_id: user._id,
                });
                if (browserDelete.deletedCount == 0)
                    throw new createHttpError.InternalServerError(
                        AuthMessage.internalServerError
                    );
            }
            const browserCreate = await this.#browserModel.create({
                user_id: user._id,
                browser: userAgent.browser,
                version: userAgent.version,
                os: userAgent.os,
                platform: userAgent.platform,
                source: userAgent.source,
                geo_ip: userAgent.geoIp,
                is_mobile: userAgent.isMobile,
                is_desktop: userAgent.isDesktop,
            });
            if (!browserCreate)
                throw new createHttpError.InternalServerError(
                    AuthMessage.internalServerError
                );
            if (checkLogin) {
                const loginUpdate = await this.#loginModel.updateOne(
                    { user_id: user._id },
                    {
                        browser_id: browserCreate._id,
                        ip_number: ip_number,
                        updatedAt: updateTime,
                    }
                );
                if (loginUpdate.modifiedCount == 0)
                    throw new createHttpError.InternalServerError(
                        AuthMessage.internalServerError
                    );
            }
            const loginCreate = await this.#loginModel.create({
                user_id: user._id,
                browser_id: browserCreate._id,
                ip_number: ip_number,
                createdAt: createTime,
                updatedAt: updateTime,
            });
            if (!loginCreate)
                throw new createHttpError.InternalServerError(
                    AuthMessage.internalServerError
                );
        }
        return accessToken;
    }
    async checkExistUserByMobile(mobile) {
        const user = await this.#model.findOne({ mobile });
        if (!user) throw new createHttpError.NotFound(AuthMessage.authNotFound);
        return user;
    }
    signToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.TOKEN_EXPIRESIN_TIME,
        });
    }
}

module.exports = new LoginService();
