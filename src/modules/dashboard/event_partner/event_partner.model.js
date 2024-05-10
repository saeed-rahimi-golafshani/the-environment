const { Schema, model } = require("mongoose");

const EventPartnerSchema = new Schema({
    code: {type: String, required: true, unique: true},
    file: {type: Types.ObjectId, ref: "file"},
    title: {type: String, required: true},
    slug: {type: String},
    description: {type: String},
    phone: {type: [String], default: []},
    email: {type: String, unique: true, lowercase: true},
    status: {type: Boolean, default: false},
    createdAt: {type: String},
    updatedAt: {type: String}
});

const EventPartnerModel = model("event_partner", EventPartnerSchema);
module.exports = EventPartnerModel