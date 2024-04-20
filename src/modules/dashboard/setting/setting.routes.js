const { Router } = require("express");
const SettingsController = require("./setting_controller");
const { stringToArray } = require("../../../common/exeption/string_to_array");
const { uploadFile } = require("../../../common/utills/multer");

const router = Router();
router.get("/", SettingsController.getCreateSettings);
router.post("/add", uploadFile("Setting").fields([{name: "image"}]), stringToArray("tags"), SettingsController.postCreateSettings);
router.post("/add/:code", uploadFile("Setting").fields([{name: "image"}]), stringToArray("tags"), SettingsController.updateSetting);

module.exports = {
    Settings_routes: router
} 