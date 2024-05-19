const autoBind = require("auto-bind");
const PermissionService = require("./permission.service");
const SettingsService = require("../setting/setting_service");
const PermissionModel = require("./permission_model");
const {
    UniqueCode,
    convertGregorianDateToPersionDateToToday,
} = require("../../../common/utills/public.function");
const { CODE_NAME } = require("../../../common/utills/constrant");
const permissionMessage = require("./permission.message");

class PermissionController {
    #service;
    #setting_service;
    #permissionModel;

    constructor() {
        autoBind(this);
        this.#service = PermissionService;
        this.#setting_service = SettingsService;
        this.#permissionModel = PermissionModel;
    }
    async listOfPermission(req, res, next) {
        try {
            const { search, status } = req.query;
            let permission,
                permissionCount = 0,
                showTable = false;
            if (search && status == "") {
                permission = await this.#permissionModel.find({
                    $text: { $search: search },
                });
                permissionCount = await this.#permissionModel
                    .find({
                        $text: { $search: search },
                    })
                    .countDocuments();
            } else if (search == "" && status) {
                permission = await this.#permissionModel.find({ status });
                permissionCount = await this.#permissionModel
                    .find({ status })
                    .countDocuments();
            } else if (search && status) {
                permission = await this.#permissionModel.find({
                    $text: { $search: search },
                    status,
                });
                permissionCount = await this.#permissionModel
                    .find({
                        $text: { $search: search },
                        status,
                    })
                    .countDocuments();
            } else if (search == "" && status == "") {
                permission = await this.#permissionModel.find({});
                permissionCount = await this.#permissionModel.find({}).countDocuments();
            } else {
                permission = await this.#permissionModel.find({});
                permissionCount = await this.#permissionModel.find({}).countDocuments();
            }

            if(permissionCount == 0){
                showTable = false; 
            } else{
                showTable = true;
            }

            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/permission/permission.list.ejs", {
                permission,
                permissionCount,
                showTable,
                setting,
                messages: req.flash("messages"),
                errors: req.flash("errors"),
            });
        } catch (error) {
            next(error);
        }
    };
    async getCreateOfPermission(req, res, next) {
        try {
            const code = await UniqueCode(
                CODE_NAME.PERMISSION,
                this.#permissionModel
            );
            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/permission/permission.add.ejs", {
                code,
                setting,
                messages: req.flash("messages"),
                errors: req.flash("errors"),
            });
        } catch (error) {
            next(error);
        }
    };
    async postCreateOfPermission(req, res, next) {
        try {
            const { code, title, slug, description, content, status } =
                req.body;
            let createTime, updateTime;
            createTime = convertGregorianDateToPersionDateToToday();
            updateTime = convertGregorianDateToPersionDateToToday();
            await this.#service.createPermission(req, {
                code,
                title,
                slug,
                description,
                content,
                status,
                createAt: createTime,
                updateAt: updateTime
            });
            res.locals.layout = "./pages/dashboard/permission/permission.add.ejs";
            req.flash("messages", permissionMessage.created);
            return res.redirect("/add");

        } catch (error) {
            req.flash("errors", error.message);
            next(error);
        }
    };
    async getUpdateOfPermission(req, res, nex){
        try {
            const { code } = req.params;

            const permission = await this.#service.listOfPermissionByCode(code);
            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/permission/permission.update.ejs", {
                permission,
                setting,
                messages: req.flash("messages"),
                errors: req.flash("errors"),
            });
            
        } catch (error) {
            next(error)
        }
    };
    async postUpdateOfPermission(req, res, nex){
        try {
            const { code } = req.params;
            const { title, slug, description, content, status } = req.body;
            await this.#service.updatePermission(code, {
                title,
                slug,
                description,
                content,
                status
            });
            res.locals.layout =
                "./pages/dashboard/permission/permission.update.ejs";
            req.flash("messages", permissionMessage.updated);
            return res.redirect("/edit");
            
        } catch (error) {
            req.flash('errors', error.message)
            next(error)
        }
    }
}

module.exports = new PermissionController();
