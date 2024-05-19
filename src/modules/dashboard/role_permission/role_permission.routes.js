const { Router } = require("express");
const RolePermissionController = require("./role_permission.controller");

const router = Router();
router.get("/", RolePermissionController.listOfRolePermission);
router.get("/add", RolePermissionController.getCreateOfRolePermission);
router.post("/add", RolePermissionController.postCreateOfRolePermision);
router.get("/edit/:code", RolePermissionController.getUpdateOfRolePermision);
router.post("/edit/:code", RolePermissionController.postUpdateOfRolePermision);

module.exports = {
    RolePermissionRoutes: router
}