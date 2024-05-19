const autoBind = require("auto-bind");
const RolePermissionService = require("./role_permission.service");
const SettingsService = require("../setting/setting_service");
const {
    UniqueCode,
    convertGregorianDateToPersionDateToToday,
} = require("../../../common/utills/public.function");
const { CODE_NAME } = require("../../../common/utills/constrant");
const RolePermissionModel = require("./role_permission_model");
const RoleService = require("../role/role.service");
const PermissionService = require("../permission/permission.service");
const RoleModel = require("../role/role_model");
const PermissionModel = require("../permission/permission_model");
const rolePermissionMessage = require("./role_permission.message");

class RolePermissionController {
    #service;
    #setting_service;
    #rolePermissionModel;
    #roleService;
    #permissionService;
    #roleModel;
    #permissionModel;

    constructor() {
        autoBind(this);
        this.#service = RolePermissionService;
        this.#setting_service = SettingsService;
        this.#rolePermissionModel = RolePermissionModel;
        this.#roleService = RoleService;
        this.#permissionService = PermissionService;
        this.#roleModel = RoleModel;
        this.#permissionModel = PermissionModel;
    }
    async listOfRolePermission(req, res, next) {
        try {
            const { role, permission } = req.query;
            let rolePermission,
                rolePermissionCount = 0,
                showTable = false,
                roleCode,
                permissionCode;
            roleCode = await this.#roleModel.findOne({ code: role });
            permissionCode = await this.#permissionModel.findOne({
                code: permission,
            });
            if (role && permission == "") {
                rolePermission = await this.#rolePermissionModel
                    .find({ role_id: roleCode._id })
                    .populate([{ path: "role_id" }, { path: "permission_id" }]);
                rolePermissionCount = await this.#rolePermissionModel
                    .find({ role_id: roleCode._id })
                    .populate([{ path: "role_id" }, { path: "permission_id" }])
                    .countDocuments();
            } else if (role == "" && permission) {
                rolePermission = await this.#rolePermissionModel
                    .find({ permission_id: permissionCode._id })
                    .populate([{ path: "role_id" }, { path: "permission_id" }]);
                rolePermissionCount = await this.#rolePermissionModel
                    .find({ permission_id: permissionCode._id })
                    .populate([{ path: "role_id" }, { path: "permission_id" }])
                    .countDocuments();
            } else if (role && permission) {
                rolePermission = await this.#rolePermissionModel
                    .find({
                        role_id: roleCode._id,
                        permission_id: permissionCode._id,
                    })
                    .populate([{ path: "role_id" }, { path: "permission_id" }]);
                rolePermissionCount = await this.#rolePermissionModel
                    .find({
                        role_id: roleCode._id,
                        permission_id: permissionCode._id,
                    })
                    .populate([{ path: "role_id" }, { path: "permission_id" }])
                    .countDocuments();
            } else if (role == "" && permission == "") {
                rolePermission = await this.#rolePermissionModel
                    .find({})
                    .populate([{ path: "role_id" }, { path: "permission_id" }]);
                rolePermissionCount = await this.#rolePermissionModel
                    .find({})
                    .populate([{ path: "role_id" }, { path: "permission_id" }])
                    .countDocuments();
            } else {
                rolePermission = await this.#rolePermissionModel
                    .find({})
                    .populate([{ path: "role_id" }, { path: "permission_id" }]);
                rolePermissionCount = await this.#rolePermissionModel
                    .find({})
                    .populate([{ path: "role_id" }, { path: "permission_id" }])
                    .countDocuments();
            }

            if (rolePermissionCount == 0) {
                showTable = false;
            } else {
                showTable = true;
            }

            const permissions =
                await this.#permissionService.listOfPermission();
            const roles = await this.#roleService.listOfRole();
            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/role_permission/role_permission.list.ejs",
                {
                    setting,
                    permissions,
                    roles,
                    rolePermission,
                    rolePermissionCount,
                    showTable,
                }
            );
        } catch (error) {
            next(error);
        }
    }
    async getCreateOfRolePermission(req, res, next) {
        try {
            const code = await UniqueCode(
                CODE_NAME.ROLEPERMISSION,
                this.#rolePermissionModel
            );
            const permissions =
                await this.#permissionService.listOfPermission();
            const roles = await this.#roleService.listOfRole();
            const rolePermission = await this.#service.listOfRolePermission();
            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/role_permission/role_permission.add.ejs",
                {
                    code,
                    permissions,
                    roles,
                    rolePermission,
                    setting,
                    messages: req.flash("messages"),
                    errors: req.flash("errors"),
                }
            );
        } catch (error) {
            next(error);
        }
    }
    async postCreateOfRolePermision(req, res, next) {
        try {
            const { code, role_id, permission_id } = req.body;
            const createTime = convertGregorianDateToPersionDateToToday();
            const updateTime = convertGregorianDateToPersionDateToToday();
            await this.#service.createRolePermission(req, {
                code,
                role_id,
                permission_id,
                createAt: createTime,
                updateAt: updateTime
            });
            res.locals.layout = "./pages/dashboard/role_permission/role_permission.add.ejs";
            req.flash("messages", rolePermissionMessage.created);
            return res.redirect("/add");
        } catch (error) {
            req.flash("errors", error.message);
            next(error);
        }
    }
    async getUpdateOfRolePermision(req, res, next) {
        try {
            const { code } = req.params;

            const permissions = await this.#permissionService.listOfPermission();
            const roles = await this.#roleService.listOfRole();
            const rolePermission = await this.#service.listOfRolePermissionByCode(code);
            const setting = await this.#setting_service.listOfSetting();
            res.render(
                "./pages/dashboard/role_permission/role_permission.update.ejs",
                {
                    permissions,
                    roles,
                    rolePermission,
                    setting,
                    messages: req.flash("messages"),
                    errors: req.flash("errors"),
                }
            );
        } catch (error) {
            next(error);
        }
    }
    async postUpdateOfRolePermision(req, res, next){
        try {
            const { code } = req.params;
            const { role_id, permission_id } = req.body;
            await this.#service.updateRolePermission(code, {
                role_id,
                permission_id
            });
            res.locals.layout =
                "./pages/dashboard/role_permission/role_permission.update.ejs";
            req.flash("messages", rolePermissionMessage.updated);
            return res.redirect("/edit");
            
        } catch (error) {
            req.flash('errors', error.message);
            next(error)
        }
    }
}

module.exports = new RolePermissionController();
