const autoBind = require("auto-bind");
const RoleService = require("./role.service");
const SettingsService = require("../setting/setting_service");
const {
    UniqueCode,
    convertGregorianDateToPersionDateToToday,
} = require("../../../common/utills/public.function");
const { CODE_NAME } = require("../../../common/utills/constrant");
const RoleModel = require("./role_model");
const roleMessage = require("./role.message");

class RoleController {
    #service;
    #setting_service;
    #roleModel;

    constructor() {
        autoBind(this);
        this.#service = RoleService;
        this.#setting_service = SettingsService;
        this.#roleModel = RoleModel;
    }
    async listOfRoles(req, res, next) {
        try {
            const { search, status } = req.query;
            let role,
                roleCount = 0,
                showTable = false;
            if (search && status == "") {
                role = await this.#roleModel.find({
                    $text: { $search: search },
                });
                roleCount = await this.#roleModel
                    .find({
                        $text: { $search: search },
                    })
                    .countDocuments();
            } else if (search == "" && status) {
                role = await this.#roleModel.find({ status });
                roleCount = await this.#roleModel
                    .find({ status })
                    .countDocuments();
            } else if (search && status) {
                role = await this.#roleModel.find({
                    $text: { $search: search },
                    status,
                });
                roleCount = await this.#roleModel
                    .find({
                        $text: { $search: search },
                        status,
                    })
                    .countDocuments();
            } else if (search == "" && status == "") {
                role = await this.#roleModel.find({});
                roleCount = await this.#roleModel.find({}).countDocuments();
            } else {
                role = await this.#roleModel.find({});
                roleCount = await this.#roleModel.find({}).countDocuments();
            }
            if (roleCount == 0) {
                showTable = false;
            } else {
                showTable = true;
            }

            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/roles/role.list.ejs", {
                role,
                roleCount,
                showTable,
                setting,
            });
        } catch (error) {
            next(error);
        }
    }
    async getCreateOfRole(req, res, next) {
        try {
            const code = await UniqueCode(CODE_NAME.ROLE, this.#roleModel);

            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/roles/role.add.ejs", {
                code,
                setting,
                messages: req.flash("messages"),
                errors: req.flash("errors"),
            });
        } catch (error) {
            next(error);
        }
    }
    async postCreateOfRole(req, res, next) {
        try {
            const { code, title, slug, description, content, status } = req.body;
            let createdTime, updatedTime;
            createdTime = convertGregorianDateToPersionDateToToday();
            updatedTime = convertGregorianDateToPersionDateToToday();
            await this.#service.crateRole(req, {
                code,
                title,
                slug,
                description,
                content,
                status,
                createAt: createdTime,
                updateAt: updatedTime,
            });
            res.locals.layout = "./pages/dashboard/roles/role.add.ejs";
            req.flash("messages", roleMessage.created);
            return res.redirect("/add");
        } catch (error) {
            req.flash("errors", error.message);
            next(error);
        }
    }
    async getUpdateOfRole(req, res, next) {
        try {
            const { code } = req.params;
            const role = await this.#service.listOfRoleByCode(code);
            const setting = await this.#setting_service.listOfSetting();
            res.render("./pages/dashboard/roles/role.update.ejs", {
                setting,
                role,
                messages: req.flash("messages"),
                errors: req.flash("errors"),
            });
        } catch (error) {
            next(error);
        }
    }
    async postUpdateOfRole(req, res, next) {
        try {
            const { code } = req.params;
            const { title, slug, description, content, status } = req.body;
            await this.#service.updateRole(code, {
                title,
                slug,
                description,
                content,
                status
            });
            res.locals.layout =
                "./pages/dashboard/roles/role.update.ejs";
            req.flash("messages", roleMessage.updated);
            return res.redirect("/edit");
        } catch (error) {
            req.flash('errors', error.message)
            next(error);
        }
    }
}

module.exports = new RoleController();
