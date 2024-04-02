const { Router } = require("express");
const DashboardController = require("./dashboard.controller");

const router = Router();
router.get("/", DashboardController.listOfUserPage);

module.exports = {
    DashboardRoutes: router
}