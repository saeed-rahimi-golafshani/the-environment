const { Router } = require("express");

const router = Router();
router.post("/send-otp", AuthController.sendOtp);
router.post("/check-otp", AuthController.checkOtp);
router.get("/logout", Authorization, AuthController.logOut);

module.exports = {
    AuthRoutes: router
}