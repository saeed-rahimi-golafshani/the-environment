const { Schema, Types, model } = require("mongoose");

const EventPerformerSchema = new Schema({
    code: {type: String, required: true, unique: true},
    event_id: {type: Types.ObjectId, ref: "event"},
    speaker_id: {type: Types.ObjectId, ref: "role_user"},
    ganer_id: {type: Types.ObjectId, ref: "event_performer_ganer"},
    contact_details: {type: String}
});

const EventPerformerModel = model("event_performer", EventPerformerSchema);
module.exports = EventPerformerModel