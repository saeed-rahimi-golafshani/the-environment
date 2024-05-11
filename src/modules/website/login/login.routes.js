const { Router } = require("express");
const LoginController = require("./login.controller");

const router = Router();
router.get("/", LoginController.LoginPage);

module.exports = {
    LoginRoutes: router
}