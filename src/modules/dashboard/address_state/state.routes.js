const { Router } = require("express");
const StateController = require("./state.controller");

const router = Router();
router.get("/", StateController.listOfState);
router.get("/add", StateController.getCreateState);
router.post("/add", StateController.postCreateState);
router.get("/update/:code", StateController.getUpdateState);
router.post("/update/:code", StateController.postUpdateState);

module.exports = {
    StateRoutes: router
}