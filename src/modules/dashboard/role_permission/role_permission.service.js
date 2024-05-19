const autoBind = require("auto-bind");
const RolePermissionModel = require("./role_permission_model");
const RoleModel = require("../role/role_model");
const PermissionModel = require("../permission/permission_model");
const { rolePermissionSchema } = require("./role_permission.validation");
const createHttpError = require("http-errors");
const rolePermissionMessage = require("./role_permission.message");
const {
    copyObject,
    deleteInvalidPropertyObject,
    convertGregorianDateToPersionDateToToday,
} = require("../../../common/utills/public.function");
const {
    ROLEPERMISSION_BLACKLIST,
} = require("../../../common/utills/constrant");

class RolePermissionService {
    #model;
    #roleModel;
    #permissionModel;

    constructor() {
        autoBind(this);
        this.#model = RolePermissionModel;
        this.#roleModel = RoleModel;
        this.#permissionModel = PermissionModel;
    }
    async createRolePermission(req, rolePermissionDto) {
        await rolePermissionSchema.validateAsync(req.body);
        const checkExist = await this.#model.findOne({
            role_id: rolePermissionDto.role_id,
            permission_id: rolePermissionDto.permission_id,
        });
        if (checkExist)
            throw new createHttpError.Conflict(
                rolePermissionMessage.alreadyExist
            );
        const createResault = await this.#model.create(rolePermissionDto);
        if (!createResault)
            throw new createHttpError.InternalServerError(
                rolePermissionMessage.internalServerError
            );
        return createResault;
    }
    async updateRolePermission(code, rolePermissionDto) {
        const requestBody = copyObject(rolePermissionDto);
        const checkExistRolePermission = await this.listOfRolePermissionByCode(
            code
        );
        const blackListFeilds = Object.values(ROLEPERMISSION_BLACKLIST);
        deleteInvalidPropertyObject(requestBody, blackListFeilds);
        const updateTime = convertGregorianDateToPersionDateToToday();
        const updateResault = await this.#model.updateOne(
            { code: checkExistRolePermission.code },
            { $set: requestBody, updateAt: updateTime }
        );
        if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError(rolePermissionMessage.internalServerError);
        return updateResault;
    }
    async listOfRolePermission() {
        const rolePermission = await this.#model
            .find({})
            .populate([{ path: "role_id" }, { path: "permission_id" }]);
        return rolePermission;
    }
    async listOfRolePermissionByCode(code) {
        const rolePermission = await this.#model
            .findOne({ code })
            .populate([{ path: "role_id" }, { path: "permission_id" }]);
        return rolePermission;
    }
}

module.exports = new RolePermissionService();
