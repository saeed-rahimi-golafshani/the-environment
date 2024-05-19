const autoBind = require("auto-bind");
const UserModel = require("./user_model");

class UserService {
    #model;

    constructor() {
        autoBind(this);
        this.#model = UserModel    
    }
}

module.exports = new UserService();
