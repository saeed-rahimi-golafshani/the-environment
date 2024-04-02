const { Router } = require("express");
const HomeController = require("./home.controller");

const router = Router();
router.get("/", HomeController.HomePage);

module.exports = {
    HomeRoutes: router
}