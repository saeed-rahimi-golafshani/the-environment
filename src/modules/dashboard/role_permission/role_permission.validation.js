const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN } = require("../../../common/utills/constrant");
const rolePermissionMessage = require("./role_permission.message");

const rolePermissionSchema = joi.object({
    code: joi
        .string()
        .required()
        .error(createHttpError.Conflict(rolePermissionMessage.mistekId)),
    role_id: joi
        .string()
        .trim()
        .required()
        .pattern(MONGOID_PATTERN)
        .error(createHttpError.Conflict(rolePermissionMessage.mistekRoleId)),
    permission_id: joi
        .string()
        .trim()
        .required()
        .pattern(MONGOID_PATTERN)
        .error(createHttpError.Conflict(rolePermissionMessage.mistekPermissionId))
});

module.exports = {
    rolePermissionSchema
};
