const { Router } = require("express");
const DashboardController = require("./dashboard.controller");
const { NewsCategoryRoutes } = require("./news_category/news_category.routes");

const router = Router();
router.get("/", DashboardController.dashboard);
router.use("/news_category", NewsCategoryRoutes);


module.exports = {
    DashboardRoutes: router
}