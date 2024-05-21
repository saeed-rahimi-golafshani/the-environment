const autoBind = require("auto-bind");
const RoleUserModel = require("../role_user/role_user.model");
const { operatorSchema } = require("./role_user.validation");
const createHttpError = require("http-errors");
const operatorMessage = require("./role_user.message");

class RoleUserService{
    #model;

    constructor(){
        autoBind(this);
        this.#model = RoleUserModel;
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
        return createResault;
    }
}

module.exports = new RoleUserService();

