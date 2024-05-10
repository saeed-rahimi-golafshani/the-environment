const { Router } = require("express");
const BlogController = require("./blog.controller");
const { uploadFile } = require("../../../common/utills/multer");
const { stringToArray } = require("../../../common/exeption/string_to_array");

const router = Router();
router.get("/", BlogController.blogsOFList);
router.get("/add", BlogController.getCreateBlog);
router.post(
    "/add",
    uploadFile("Blogs").fields([{ name: "image" }]),
    stringToArray("tags"),
    BlogController.postCrateBlog
);
router.get("/update/:code", BlogController.getUpdateBlog);
router.post(
    "/update/:code",
    uploadFile("Blogs").fields([{ name: "image" }]),
    stringToArray("tags"),
    BlogController.postUpdateBlog
);

module.exports = {
    BlogRoutes: router,
};
