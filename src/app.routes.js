const { Router } = require("express");
const { DashboardRoutes } = require("./modules/dashboard/dashboard.routes");
const { HomeRoutes } = require("./modules/website/home/home.routes");
const { BlogArchiveRoutes } = require("./modules/website/blogs/blog_archive/blog_archive.routes");

const router = Router();

router.use("/", HomeRoutes);
router.use("/dashboard", DashboardRoutes);
router.use("/blogs", BlogArchiveRoutes);
module.exports = {
    mainRoutes: router
}