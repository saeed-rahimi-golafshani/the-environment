const auto_bind = require("auto-bind");
const { getPersianDate } = require("../../common/utills/public.function");

class DashboardService {

    constructor() {
        auto_bind(this);
        
    }

    async persionDateNow(){
        const now = new Date();
        const date = getPersianDate(now);
        return date;
    }
    
}

module.exports = new DashboardService();
