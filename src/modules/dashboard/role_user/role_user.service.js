const autoBind = require("auto-bind");
const RoleUserModel = require("../role_user/role_user.model");
const { operatorSchema } = require("./role_user.validation");
const createHttpError = require("http-errors");
const operatorMessage = require("./role_user.message");
const UserModel = require("../user/user_model");

class RoleUserService{
    #model;
    #userModel;

    constructor(){
        autoBind(this);
        this.#model = RoleUserModel;
        this.#userModel = UserModel;
    }

    async listOfOperator(){
        const operator = await this.#model.find({}).populate([
            {path: "role_id"},
            {path: "user_id"}
        ]);
        return operator
    }
    async createOperator(req, operatorDto){
        await operatorSchema.validateAsync(req.body);
        const checkExist = await this.#model.findOne({
            role_id: operatorDto.role_id,
            user_id: operatorDto.user_id
        });
        if(checkExist) throw new createHttpError.Conflict(operatorMessage.alreadyExist);
        const createResault = await this.#model.create(operatorDto);
        if(!createResault) throw new createHttpError.InternalServerError(operatorMessage.internalServerError);
        const updateResault = await this.#userModel.updateOne({_id: createResault._id}, {$set: user_default_role == ""});
        if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError(operatorMessage.internalServerError);
        return createResault;
    }
}

module.exports = new RoleUserService();

