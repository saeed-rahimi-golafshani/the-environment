const auto_bind = require("auto-bind");
const StateModel = require("./state_model");
const { createStateSchema } = require("./state.validation");
const createHttpError = require("http-errors");
const stateMessage = require("./state.message");
const { copyObject, deleteInvalidPropertyObject } = require("../../../common/utills/public.function");
const { STATEADDRESS_BLACKLIST } = require("../../../common/utills/constrant");

class StateService{
    #model

    constructor(){
        auto_bind(this);
        this.#model = StateModel;
    }
    async craeteState(req, stateDto){
        console.log(stateDto);
        await createStateSchema.validateAsync(req.body);
        const checkExist = await this.#model.findOne({stateName: stateDto.stateName});
        if(checkExist) throw new createHttpError.Conflict(stateMessage.alreadyExist);
        const state = await this.#model.create(stateDto);
        if(!state) throw new createHttpError.InternalServerError(stateMessage.internalServerError);
        return state
    }
    async updateState(code, stateDto){
        const requestBody = copyObject(stateDto);
        const checkExist = await this.#model.findOne({code});
        if(!checkExist) throw new createHttpError.NotFound(stateMessage.notFound);
        const blackListFeilds = Object.values(STATEADDRESS_BLACKLIST);
        deleteInvalidPropertyObject(requestBody, blackListFeilds);
        const updateResault = await this.#model.updateOne({code: checkExist.code}, {$set: requestBody});
        if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError(stateMessage.internalServerError);
        return updateResault;
    }
    async listOfStateByCode(code){
        const state = await this.#model.findOne({code});
        return state;
    }
}

module.exports = new StateService();