const auto_bind = require("auto-bind");
const { authMessageGaurd } = require("../../../common/messages/auth.message");
const jwt = require("jsonwebtoken");
const UserModel = require("../../dashboard/user/user_model");
const createHttpError = require("http-errors");
const RoleUserModel = require("../../dashboard/role_user/role_user.model");
require("dotenv").config();

class HomeService {
    #userModel;
    #roleUser;

    constructor() {
        auto_bind(this);
        this.#userModel = UserModel
        this.#roleUser = RoleUserModel;
    }
    async userToken(req, next){
        let user;
        const token = req?.cookies?.access_token;
        if(token){
            if(!token) throw new createHttpError.Unauthorized(authMessageGaurd.login);
            const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if(typeof data === "object" && "id" in data){
                user = await this.#userModel.findById(data.id, {accessToken: 0, otp: 0, __v: 0, updatedAt: 0, verifiedMobile: 0}).lean();
                if(!user) throw new createHttpError.Unauthorized(authMessageGaurd.notFoundAccount);
                req.user = user;
                return user
            }
            throw new createHttpError.Unauthorized(authMessageGaurd.invalidToken);
        }
        
    };
    async openDashbord(req){
        const user = req.user;
        const operator = await this.#roleUser.findOne({user_id: user._id}).populate([
            {path: "user_id"},
            {path: "role_id"}
        ])
        return operator
    };
    
    
}
    


module.exports = new HomeService();
