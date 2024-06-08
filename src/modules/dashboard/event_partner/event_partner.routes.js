const { Router } = require("express");
const EventPartnerCOntroller = require("./event_partner.controller");
const { uploadFile } = require("../../../common/utills/multer");

const router = Router();
router.get("/", EventPartnerCOntroller.listOfEventPartner);
router.get("/add", EventPartnerCOntroller.getCreateEventPartner);
router.post("/add", uploadFile("Event_Partner").fields([{ name: "image" }]), EventPartnerCOntroller.postCreateEventPartner);
router.get("/update/:code", EventPartnerCOntroller.getUpdateEventPartner);
router.post("/update/:code", uploadFile("Event_Partner").fields([{ name: "image" }]), EventPartnerCOntroller.postUpdateeventPartner);



module.exports = {
    EventPartnerRoutes: router
}