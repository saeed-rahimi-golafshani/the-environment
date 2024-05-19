const { Router } = require("express");
const PermissionController = require("./permission.controller");

const router = Router();
router.get("/", PermissionController.listOfPermission);
router.get("/add", PermissionController.getCreateOfPermission);
router.post("/add", PermissionController.postCreateOfPermission);
router.get("/edit/:code", PermissionController.getUpdateOfPermission);
router.post("/edit/:code", PermissionController.postUpdateOfPermission);

module.exports = {
    PermissionRoutes: router
}