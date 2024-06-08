const { Schema, Types, model } = require("mongoose");

const Event_categorySchema = new Schema({
    code: {type: String, required: true, unique: true},
    parent: {type: Types.ObjectId, ref: "event_category"},
    title: {type: String, required: true},
    slug: {type: String},
    description: {type: String},
    tags: {type: [String], default: []},
    show_in_archive: {type: Boolean, default: false},
    createdAt: {type: String},
    updatedAt: {type: String}
});

Event_categorySchema.index({title: "text", slug: "text"});

const EventCategoryModel = model("event_category", Event_categorySchema);
module.exports = EventCategoryModel