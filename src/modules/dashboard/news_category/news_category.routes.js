const { Router } = require("express");
const NewsCategoryController = require("./news_category.controller");

const router = Router();
router.get("/", NewsCategoryController.newsCategoryList);
router.get("/add", NewsCategoryController.getCreatenewsCategory);

module.exports = {
    NewsCategoryRoutes: router
}