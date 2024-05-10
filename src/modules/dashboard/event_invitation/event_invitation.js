const { Schema, model } = require("mongoose");

const EventInvitationSchema = new Schema({
    code: {type: String, required: true, unique: true},
    event_id: {type: Types.ObjectId, ref: "event"},
    user_id: {type: Types.ObjectId, ref: "user"},
    invitation_response_id: {type: Types.ObjectId, ref: "event_invitation_response"},
    send_date: {type: String, required: true},
    text_response: {type: String},
    response_date: {type: String}
});

const EventInvitationModel = model("event_invitation", EventInvitationSchema);
module.exports = EventInvitationModel