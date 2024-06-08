const { Router } = require("express");
const EventCategoryController = require("./event_category.controller");
const { stringToArray } = require("../../../common/exeption/string_to_array");

const router = Router();
router.get("/", EventCategoryController.listOfEventCategory);
router.get("/add", EventCategoryController.getCreateOfEventCategory);
router.post("/add", stringToArray("tags"), EventCategoryController.postCreateOfEventCategory);
router.get("/update/:code", EventCategoryController.getUpdateOfEventCategory);
router.post("/update/:code", stringToArray("tags"), EventCategoryController.postUpdateOfEventCategory);


module.exports = {
    EventCategoryRoutes: router
}