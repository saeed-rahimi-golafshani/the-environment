const { Router } = require("express");
const BlogCategoryController = require("./blog_category.controller");

const router = Router();
router.get("/", BlogCategoryController.listOfBlogCategory);
router.get("/add", BlogCategoryController.getCreateOfBlogCategory);
router.post("/add", BlogCategoryController.postCreateOfBlogCategory);
router.get("/update/:code", BlogCategoryController.getUpdateOfBlogCategory);
router.post("/update/:code", BlogCategoryController.postUpdateOfBlogCategory);

module.exports = {
    BlogCategoryRoutes: router
}