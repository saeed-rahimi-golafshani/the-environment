const autoBind = require("auto-bind");
const { permissionRoleSchema } = require("./permission.validation");
const { default: slugify } = require("slugify");
const {
    alreadyExistBySlug,
    copyObject,
    deleteInvalidPropertyObject,
    convertGregorianDateToPersionDateToToday,
} = require("../../../common/utills/public.function");
const PermissionModel = require("./permission_model");
const createHttpError = require("http-errors");
const permissionMessage = require("./permission.message");
const { PERMISSION_BLACKLIST } = require("../../../common/utills/constrant");

class PermissionService {
    #model;

    constructor() {
        autoBind(this);
        this.#model = PermissionModel;
    };
    async createPermission(req, permissionDto) {
        await permissionRoleSchema.validateAsync(req.body);
        if (permissionDto?.slug) {
            permissionDto.slug = slugify(permissionDto.slug);
            await alreadyExistBySlug(permissionDto.slug, this.#model);
        } else {
            permissionDto.slug = slugify(permissionDto.title);
        }
        const createPermission = await this.#model.create(permissionDto);
        if (!createPermission)
            throw new createHttpError.InternalServerError(
                permissionMessage.internalServerError
            );
        return createPermission;
    };
    async updatePermission(code, permissionDto){
        const requestBody = copyObject(permissionDto);
        const checkExistPermission = await this.listOfPermissionByCode(code);
        const blackListFeilds = Object.values(PERMISSION_BLACKLIST);
        deleteInvalidPropertyObject(requestBody, blackListFeilds);
        if (requestBody.status == true) {
            requestBody.status = true;
        } else if (requestBody.status == false) {
            requestBody.status = false;
        }
        const updatedTime = convertGregorianDateToPersionDateToToday();
        const updateResault = await this.#model.updateOne(
            { code: checkExistPermission.code },
            { $set: requestBody, updateAt: updatedTime }
        );
        if (updateResault.modifiedCount == 0)
            throw new createHttpError.InternalServerError(
                permissionMessage.internalServerError
            );
        return updateResault;
    }
    async listOfPermissionByCode(code) {
        const permission = await this.#model.findOne({ code });
        if (!permission)
            throw new createHttpError.NotFound(permissionMessage.notFound);
        return permission;
    };
    async listOfPermission(){
        const permissions = await this.#model.find({});
        return permissions;
    };
}

module.exports = new PermissionService();
