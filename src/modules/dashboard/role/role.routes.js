const { Router } = require("express");
const RoleController = require("./role.controller");

const router = Router();
router.get("/", RoleController.listOfRoles);
router.get("/add", RoleController.getCreateOfRole);
router.post("/add", RoleController.postCreateOfRole);
router.get("/edit/:code", RoleController.getUpdateOfRole);
router.post("/edit/:code", RoleController.postUpdateOfRole);

module.exports = {
    RoleRoutes: router
}