const { Schema, model } = require("mongoose");

const EventinvitationResponseSchema = new Schema({
    code: {type: String, required: true, unique: true},
    title: {type: String, required: true},
});

const EventinvitationResponseModel = model("event_invitation", EventinvitationResponseSchema);
module.exports = EventinvitationResponseModel