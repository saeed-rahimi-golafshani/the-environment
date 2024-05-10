const { Router } = require("express");
const NewsController = require("./news.controller");
const { uploadFile } = require("../../../common/utills/multer");
const { stringToArray } = require("../../../common/exeption/string_to_array");

const router = Router();
router.get("/", NewsController.listOfNews);
router.get("/add", NewsController.getCreateNews);
router.post(
    "/add",
    uploadFile("News").fields([{ name: "image" }]),
    stringToArray("tags"),
    NewsController.postCreateNews
);
router.get("/update/:code", NewsController.getUpdateNews);
router.post(
    "/update/:code",
    uploadFile("News").fields([{ name: "image" }]),
    stringToArray("tags"),
    NewsController.postUpdateNews
);


module.exports = {
    NewsRoutes: router,
};
