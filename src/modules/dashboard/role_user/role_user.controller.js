const autoBind = require("auto-bind");
const SettingsService = require("../setting/setting_service");
const UserService = require("../user/user.service");
const RoleService = require("../role/role.service");
const RoleUserService = require("./role_user.service");
const { UniqueCode } = require("../../../common/utills/public.function");
const { CODE_NAME } = require("../../../common/utills/constrant");
const RoleUserModel = require("./role_user.model");
const operatorMessage = require("./role_user.message");
const RoleModel = require("../role/role_model");
const UserModel = require("../user/user_model");

class RoleUserController{
    #service;
    #setting_service;
    #userService;
    #roleService;
    #roleUserModel;
    #roleModel;
    #userModel;

    constructor(){
        autoBind(this);
        this.#service = RoleUserService;
        this.#setting_service = SettingsService;
        this.#userService = UserService;
        this.#roleService = RoleService;
        this.#roleUserModel = RoleUserModel;
        this.#roleModel = RoleModel;
        this.#userModel = UserModel;
    }
    async listOfOperator(req, res, next){
        try {
            const { role, user } = req.query;
            let operator,
                operatorCount = 0,
                showTable = false,
                roleCode,
                userCode;
            roleCode = await this.#roleModel.findOne({ code: role });

            userCode = await this.#userModel.findOne({
                code: user,
            });
            if (role && user == "") {
                operator = await this.#roleUserModel
                    .find({ role_id: roleCode._id })
                    .populate([{ path: "role_id" }, { path: "user_id" }]);
                operatorCount = await this.#roleUserModel
                    .find({ role_id: roleCode._id })
                    .populate([{ path: "role_id" }, { path: "user_id" }])
                    .countDocuments();
            } else if (role == "" && user) {
                operator = await this.#roleUserModel
                    .find({ user_id: userCode._id })
                    .populate([{ path: "role_id" }, { path: "user_id" }]);
                operatorCount = await this.#roleUserModel
                    .find({ user_id: userCode._id })
                    .populate([{ path: "role_id" }, { path: "user_id" }])
                    .countDocuments();
            } else if (role && user) {
                operator = await this.#roleUserModel
                    .find({
                        role_id: roleCode._id,
                        user_id: userCode._id,
                    })
                    .populate([{ path: "role_id" }, { path: "user_id" }]);
                operatorCount = await this.#roleUserModel
                    .find({
                        role_id: roleCode._id,
                        user_id: userCode._id,
                    })
                    .populate([{ path: "role_id" }, { path: "user_id" }])
                    .countDocuments();
            } else if (role == "" && user == "") {
                operator = await this.#roleUserModel
                    .find({})
                    .populate([{ path: "role_id" }, { path: "user_id" }]);
                operatorCount = await this.#roleUserModel
                    .find({})
                    .populate([{ path: "role_id" }, { path: "user_id" }])
                    .countDocuments();
            } else {
                operator = await this.#roleUserModel
                    .find({})
                    .populate([{ path: "role_id" }, { path: "user_id" }]);
                operatorCount = await this.#roleUserModel
                    .find({})
                    .populate([{ path: "role_id" }, { path: "user_id" }])
                    .countDocuments();
            }

            if (operatorCount == 0) {
                showTable = false;
            } else {
                showTable = true;
            }

            const users = await this.#userService.listOfUser();
            const roles = await this.#roleService.listOfRole();
            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/role_user/role_user.list.ejs",
                {
                    showTable,
                    users,
                    roles,
                    operator,
                    operatorCount,
                    setting,
                    messages: req.flash("messages"),
                    errors: req.flash("errors"),
                }
            );
            
        } catch (error) {
            next(error)
        }
    };
    async getCreateOfOperator(req, res, next){
        try {

            const code = await UniqueCode(CODE_NAME.OPERATOR, this.#roleUserModel);
            const setting = await this.#setting_service.listOfSetting();
            const users = await this.#userService.listOfUser();
            const roles = await this.#roleService.listOfRole();
            const operator = await this.#service.listOfOperator();
            res.render(
                "./pages/dashboard/role_user/role_user.add.ejs",
                {
                    code,
                    operator,
                    roles,
                    users,
                    setting,
                    messages: req.flash("messages"),
                    errors: req.flash("errors"),
                }
            );
            
        } catch (error) {
            next(error)
        }
    }
    async postCreateOfOperator(req, res, next){
        try {

            const { code, user_id, role_id, status } = req.body;
            await this.#service.createOperator(req, {
                code, 
                role_id,
                user_id,
                status
            });
            res.locals.layout = "./pages/dashboard/role_user/role_user.add.ejs";
            req.flash("messages", operatorMessage.created);
            return res.redirect("/add");
            
        } catch (error) {
            req.flash("errors", error.message);
            next(error)
        }
    }

}

module.exports = new RoleUserController();