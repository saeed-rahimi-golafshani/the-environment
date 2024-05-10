const { Router } = require("express");
const DashboardController = require("./dashboard.controller");
const { NewsCategoryRoutes } = require("./news_category/news_category.routes");
const { Settings_routes } = require("./setting/setting.routes");
const { BlogCategoryRoutes } = require("./blog_category/blog_category.routes");
const { BlogRoutes } = require("./blog/blog.routes");
const { NewsRoutes } = require("./news/news.routes");
const { OrganizationRoutes } = require("./organizations/organization.routes");

const router = Router();
router.get("/", DashboardController.dashboard);
router.use("/news_category", NewsCategoryRoutes);
router.use("/setting", Settings_routes);
router.use("/blog_category", BlogCategoryRoutes);
router.use("/blog", BlogRoutes);
router.use("/news", NewsRoutes);
router.use("/organization", OrganizationRoutes);


module.exports = {
    DashboardRoutes: router
}