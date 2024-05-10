
const { Schema, model } = require("mongoose");

const EventAttendSchema = new Schema({
    code: {type: String, required: true, unique: true},
    event_id: {type: Types.ObjectId, ref: "event"},
    user_id: {type: Types.ObjectId, ref: "user"},
    email: {type: String, required: true, unique: true, lowercase: true},
    phone: {type: String, required: true, unique: true},
    name: {type: String}
});

const EventAttendModel = model("event_attend", EventAttendSchema);
module.exports = EventAttendModel