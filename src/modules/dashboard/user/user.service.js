const autoBind = require("auto-bind");
const UserModel = require("./user_model");

class UserService {
    #model;

    constructor() {
        autoBind(this);
        this.#model = UserModel    
    }
    async listOfUser(){
        const user = await this.#model.find({});
        return user;
    }
}

module.exports = new UserService();
