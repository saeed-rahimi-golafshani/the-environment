const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { authMessageGaurd } = require("../messages/auth.message") 
const UserModel = require("../../modules/dashboard/user/user_model");
require("dotenv").config();


const Authorization = async (req, res, next) => {
    try {
        const token = req?.cookies?.access_token;
        if(!token) throw new createHttpError.Unauthorized(authMessageGaurd.login);
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(typeof data === "object" && "id" in data){
            const user = await UserModel.findById(data.id, {accessToken: 0, otp: 0, __v: 0, updatedAt: 0, verifiedMobile: 0}).lean();
            if(!user) throw new createHttpError.Unauthorized(authMessageGaurd.notFoundAccount);
            req.user = user;
            return next();
        }
        throw new createHttpError.Unauthorized(authMessageGaurd.invalidToken);
    } catch (error) {
        next(error)
    }
};

module.exports = Authorization