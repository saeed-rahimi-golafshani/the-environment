const auto_bind = require("auto-bind");

class HomeService {

    constructor() {
        auto_bind(this);
        
    }
    
}

module.exports = new HomeService();
