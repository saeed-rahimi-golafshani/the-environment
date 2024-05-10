const { Schema, model } = require("mongoose");

const EventIsPartnerSchema = new Schema({
    code: {type: String, required: true, unique: true},
    event_id: {type: Types.ObjectId, ref: "event"},
    role_id: {type: Types.ObjectId, ref: "role"},
    partner_id: {type: Types.ObjectId, ref: "event_partner"},
});

const EventIsPartnerModel = model("event_is_partner", EventIsPartnerSchema);
module.exports = EventIsPartnerModel