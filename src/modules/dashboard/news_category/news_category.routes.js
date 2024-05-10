const { Router } = require("express");
const NewsCategoryController = require("./news_category.controller");
const { uploadFile } = require("../../../common/utills/multer");
const { stringToArray } = require("../../../common/exeption/string_to_array");

const router = Router();
router.get("/", NewsCategoryController.newsCategoryList);
router.get("/add", NewsCategoryController.getCreatenewsCategory);
router.post(
    "/add",
    uploadFile("News_Category").fields([{ name: "image" }]),
    stringToArray("tags"),
    NewsCategoryController.postCreatenewsCategory
);
router.get("/update/:code", NewsCategoryController.getUpdateNewsCategory);
router.post(
    "/update/:code",
    uploadFile("News_Category").fields([{ name: "image" }]),
    stringToArray("tags"),
    NewsCategoryController.postUpdateNewsCategory
);

module.exports = {
    NewsCategoryRoutes: router,
};
