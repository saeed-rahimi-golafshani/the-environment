const { Router } = require("express");
const BlogArchiveController = require("./blog_archive.controller");

const router = Router();
router.get("/archive/:code/:slug", BlogArchiveController.BlogArchivePage);

module.exports = {
    BlogArchiveRoutes: router
}