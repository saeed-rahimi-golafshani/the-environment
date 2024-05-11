const auto_bind = require("auto-bind");
const UserModel = require("../user/user_model");
const ip = require("ip");
const { sendOtpSchema } = require("./auth.validation");
const { randomInt } = require("crypto");
const createHttpError = require("http-errors");
const AuthMessage = require("./auth.message");
const ActivationModel = require("../activation/activation_model");
const { convertGregorianDateToPersionDateToToday } = require("../../../common/utills/public.function");

class AuthService{
    #model
    #activationModel

    constructor(){
        auto_bind(this);
        this.#model = UserModel;
        this.#activationModel = ActivationModel;
    }
    async sendOtp(req, sendOtpDto){
        let user, now, otp, newUser, createTime, updateTime;
        createTime = convertGregorianDateToPersionDateToToday();
        updateTime = convertGregorianDateToPersionDateToToday();
        await sendOtpSchema.validateAsync(req.body);
        now = new Date().getTime();
        otp = {
            code: randomInt(10000, 99999),
            expiresIn: now + (1000*60*2)
        }
        user = await this.#model.findOne({mobile: sendOtpDto.mobile})
        if(!user){
            newUser = await this.#model.create(sendOtpDto);
            if(!newUser) throw new createHttpError.InternalServerError(AuthMessage.internalServerError);
            await this.#activationModel.create({
                user_Id: newUser._id,
                otp,
                createdAt: createTime,
                updatedAt: updateTime
            });
            return newUser
        };
        const userActivation = await this.#activationModel.findOne({user_Id: user._id});
        if(userActivation.otp && userActivation.otp.expiresIn > now){
            throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired);
        }
        userActivation.otp = otp;
        userActivation.updatedAt= updateTime;
        await userActivation.save();
        await user.save();
        return user
    };

    async checkOtp(mobile, code, req){
        
    };
    async checkExistUserByMobile(mobile){
        
    }
    signToken(payload){
        
    }


}

module.exports = new AuthService()