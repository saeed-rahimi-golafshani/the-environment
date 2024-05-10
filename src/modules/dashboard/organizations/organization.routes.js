const { Router } = require("express");
const OrganizationController = require("./organization.controller");
const { uploadFile } = require("../../../common/utills/multer");
const { stringToArray } = require("../../../common/exeption/string_to_array");

const router = Router();
router.get("/", OrganizationController.organizationOfList);
router.get("/add", OrganizationController.getCreateOrganization);
router.post(
    "/add",
    uploadFile("Organizations").fields([{ name: "image" }]),
    stringToArray("tags"),
    OrganizationController.postCreateOrganization
);

module.exports = {
    OrganizationRoutes: router,
};
