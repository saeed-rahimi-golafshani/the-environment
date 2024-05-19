const autoBind = require("auto-bind");
const UserService = require("./user.service");
const SettingsService = require("../setting/setting_service");
const UserModel = require("./user_model");

class UserController {
    #service;
    #setting_service;
    #userModel;

    constructor() {
        autoBind(this);
        this.#service = UserService;
        this.#setting_service = SettingsService;
        this.#userModel = UserModel;
    }
    async listOfUser(req, res, next) {
        try {
            let users,
                userCount = 0,
                showTable = false;
            const { search, status, gender } = req.query;
            if ((search && status == "" && gender == "")) {
                users = await this.#userModel.find({
                    $text: { $search: search },
                });
                userCount = await this.#userModel
                    .find({
                        $text: { $search: search },
                    })
                    .countDocuments();
            } else if (status && search == "" && gender == "") {
                users = await this.#userModel.find({
                    access_profile: status
                });
                userCount = await this.#userModel
                    .find({
                        access_profile: status
                    })
                    .countDocuments();
            } else if (gender && search == "" && status == "") {
                users = await this.#userModel.find({
                    gender,
                });
                userCount = await this.#userModel
                    .find({
                        gender,
                    })
                    .countDocuments();
            } else if (search && status && gender == "") {
                users = await this.#userModel.find({
                    $text: { $search: search },
                    access_profile: status,
                });
                userCount = await this.#userModel.find({
                    $text: { $search: search },
                    access_profile: status,
                }).countDocuments();
            } else if (search && gender && status == "") {
                // search && gender && status =""
                users = await this.#userModel.find({
                    $text: { $search: search },
                    gender
                });
                userCount = await this.#userModel.find({
                    $text: { $search: search },
                    gender
                }).countDocuments();
            } else if (search == "" && status && gender) {
                users = await this.#userModel.find({
                    access_profile: status,
                    gender
                });
                userCount = await this.#userModel.find({
                    access_profile: status,
                    gender
                }).countDocuments();
            } else if (search && status && gender) {
                users = await this.#userModel.find({
                    $text: { $search: search },
                    access_profile: status,
                    gender
                });
                userCount = await this.#userModel.find({
                    $text: { $search: search },
                    access_profile: status,
                    gender
                }).countDocuments();
            } else if (search == "" && status == "" && gender == "") {
                users = await this.#userModel.find({});
                userCount = await this.#userModel.find({}).countDocuments();
            } else {
                users = await this.#userModel.find({});
                userCount = await this.#userModel.find({}).countDocuments();
            }
            if (userCount == 0) {
                showTable = false;
            } else {
                showTable = true;
            }

            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/users/user.list.ejs", {
                users,
                userCount,
                showTable,
                setting,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
