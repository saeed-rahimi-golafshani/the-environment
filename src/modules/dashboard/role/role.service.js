const autoBind = require("auto-bind");
const RoleModel = require("./role_model");
const { createRoleSchema } = require("./role.validation");
const { default: slugify } = require("slugify");
const {
    alreadyExistBySlug,
    copyObject,
    deleteInvalidPropertyObject,
    convertGregorianDateToPersionDateToToday,
} = require("../../../common/utills/public.function");
const createHttpError = require("http-errors");
const roleMessage = require("./role.message");
const { ROLE_BLACKLIST } = require("../../../common/utills/constrant");

class RoleService {
    #model;
    constructor() {
        autoBind(this);
        this.#model = RoleModel;
    }
    async crateRole(req, roleDto) {
        await createRoleSchema.validateAsync(req.body);
        if (roleDto?.slug) {
            roleDto.slug = slugify(roleDto.slug);
            await alreadyExistBySlug(roleDto.slug, this.#model);
        } else {
            roleDto.slug = slugify(roleDto.title);
        }
        const createRole = await this.#model.create(roleDto);
        if (!createRole)
            throw new createHttpError.InternalServerError(
                roleMessage.internalServerError
            );
        return createRole;
    }
    async updateRole(code, roleDto) {
        const requestBody = copyObject(roleDto);
        const checkExistRole = await this.listOfRoleByCode(code);
        const blackListFeilds = Object.values(ROLE_BLACKLIST);
        deleteInvalidPropertyObject(requestBody, blackListFeilds);
        if (requestBody.status == true) {
            requestBody.status = true;
        } else if (requestBody.status == false) {
            requestBody.status = false;
        }
        const updatedTime = convertGregorianDateToPersionDateToToday();
        const updateResault = await this.#model.updateOne(
            { code: checkExistRole.code },
            { $set: requestBody, updateAt: updatedTime }
        );
        if (updateResault.modifiedCount == 0)
            throw new createHttpError.InternalServerError(
                roleMessage.internalServerError
            );
        return updateResault;
    }
    async listOfRoleByCode(code) {
        const role = await this.#model.findOne({ code });
        if (!role) throw new createHttpError.NotFound(roleMessage.notFound);
        return role;
    }
    async listOfRole(){
        const roles = await this.#model.find({});
        return roles;
    };
}

module.exports = new RoleService();
