const { Schema, Types, model } = require("mongoose");

const Event_categorySchema = new Schema({
    code: {type: String, required: true, unique: true},
    parent: {type: Types.ObjectId, ref: "event_category"},
    file: {type: Types.ObjectId, ref: "file"},
    title: {type: String, required: true},
    slug: {type: String},
    description: {type: String},
    tags: {type: [String], default: []},
    show_in_archive: {type: Boolean, default: false},
    createdAt: {type: String},
    updatedAt: {type: String}
});

const EventCategoryModel = model("event_category", Event_categorySchema);
module.exports = EventCategoryModel