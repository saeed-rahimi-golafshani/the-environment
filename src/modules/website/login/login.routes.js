const { Router } = require("express")
const LoginController = require("./login.controller");
const Authorization = require("../../../common/guard/authorization.guard");

const router = Router();
router.get("/register", LoginController.registerPage);
router.post("/register", LoginController.postRegister);
router.get("/login", LoginController.loginPage);
router.post("/login", LoginController.postLogin);
router.get("/logout", Authorization, LoginController.logOut);

module.exports = {
    LoginRoutes: router
}