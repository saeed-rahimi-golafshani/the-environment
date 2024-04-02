const { Router } = require("express");
const { DashboardRoutes } = require("./modules/dashboard/dashboard.routes");
const { HomeRoutes } = require("./modules/website/home/home.routes");

const router = Router();

router.use("/dashboard", DashboardRoutes);
router.use("/", HomeRoutes);
module.exports = {
    mainRoutes: router
}