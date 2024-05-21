const { Router } = require("express");
const RoleUserController = require("./role_user.controller");
const router = Router();
router.get("/", RoleUserController.listOfOperator);
router.get("/add", RoleUserController.getCreateOfOperator);
router.post("/add", RoleUserController.postCreateOfOperator);

module.exports = {
    RoleUserRoutes : router
};