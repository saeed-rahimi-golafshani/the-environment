// const SettingsService = require("../../modules/dashboard/setting/setting_service");

function notFoundHandler(app){
    app.use(async(req, res, next) => {
        // const setting = await SettingsService.listOfSetting();
        // getTwoLine = await SettingsService.getLineDescription();
        // res.locals.layout = "./layouts/website/404/main.ejs";
        // res.render("./pages/website/404_errors/404_error.ejs", {
        //     setting,
        //     getTwoLine
        // })
        res.status(404).json({
            message: "مسیری یافت نشد"
        })
    })
};

module.exports = notFoundHandler