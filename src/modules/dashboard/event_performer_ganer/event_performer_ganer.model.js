const { Schema, Types, model } = require("mongoose");

const EventPerformerGanerSchema = new Schema({
    code: {type: String, required: true, unique: true},
    title: {type: String}
});

const EventPerformerGanerModel = model("event_performer_ganer", EventPerformerGanerSchema);
module.exports = EventPerformerGanerModel