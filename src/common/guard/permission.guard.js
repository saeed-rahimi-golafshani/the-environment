const createHttpError = require("http-errors");
const PermissionModel = require("../../modules/dashboard/permission/permission_model");
const RolePermissionModel = require("../../modules/dashboard/role_permission/role_permission_model");
const RoleUserModel = require("../../modules/dashboard/role_user/role_user.model");
const { PERMISSIONS } = require("../utills/constrant");
const { permissionMessageGaurd } = require("../messages/auth.message");


const checkPermission = (requiredPermission = []) => {
    return async function(req, res, next){
        try {
            const allPermissions = requiredPermission.flat(2);
            const user = req.user;
           
            const role = await RoleUserModel.findOne({user_id: user._id});
            const rolePermission = await RolePermissionModel.find({role_id: role.role_id});
            const id_permission = rolePermission.map(item => item.permission_id);
            const permissions = await PermissionModel.find({_id: {$in: id_permission}});
            const userPermission = permissions.map(item => item.slug);
            const haPermission = allPermissions.every(permission => {
                return userPermission.includes(permission)
            });
            if(userPermission.includes(PERMISSIONS.SUPER_ADMIN)) return next()
            if(allPermissions.length == 0 || haPermission) return next()
            throw new createHttpError.Forbidden(permissionMessageGaurd.forbidden)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    checkPermission
}