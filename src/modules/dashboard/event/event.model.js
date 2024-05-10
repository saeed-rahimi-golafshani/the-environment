const { Schema, Types, model } = require("mongoose");

const EventSchema = new Schema({
    code: {type: String, required: true, unique: true},
    event_category_id: {type: Types.ObjectId, ref: "event_category"},
    event_status_id: {type: Types.ObjectId, ref: "event_status"},
    file: {type: Types.ObjectId, ref: "file"},
    organizer: {type: Types.ObjectId, ref: "role_user"},
    location_id: {type: Types.ObjectId, ref: "address"},
    title: {type: String, required: true},
    slug: {type: String},
    description: {type: String},
    short_text: {type: String},
    tags: {type: [String], default: []},
    started_date: {type: String},
    end_date: {type: String},
    registration_end_date: {type: String},
    is_public: {type: Boolean, default: false},
    capicity: {type: Number, default: 0},
    createdAt: {type: String},
    updatedAt: {type: String}
});

const EventModel = model("event", EventSchema);
module.exports = EventModel