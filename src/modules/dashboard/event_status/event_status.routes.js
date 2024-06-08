const { Router } = require("express");
const EventStatusController = require("./event_status.controller");

const router = Router();
router.get("/", EventStatusController.listOfEventStatus);
router.get("/add", EventStatusController.getCreateEventStatus);
router.post("/add", EventStatusController.postCreateEventStatus);
router.get("/update/:code", EventStatusController.getUpdateEventStatus);
router.post("/update/:code", EventStatusController.postUpdateEventStatus);

module.exports = {
    eventStatusRoutes: router
}