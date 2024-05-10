const { Schema, model } = require("mongoose");

const EventStatusSchema = new Schema({
    code: {type: String, required: true, unique: true},
    title: {type: String, required: true}
});

const EventStatusModel = model("event_status", EventStatusSchema);
module.exports = EventStatusModel