const { Schema, model, Types } = require("mongoose");

const EventPartnerSchema = new Schema({
    code: {type: String, required: true, unique: true},
    file: {type: Types.ObjectId, ref: "file"},
    title: {type: String, required: true},
    slug: {type: String},
    description: {type: String},
    phone: {type: String},
    mobile: {type: String},
    status: {type: Boolean, default: false},
    createdAt: {type: String},
    updatedAt: {type: String}
});
EventPartnerSchema.index({title: "text", slug: "text", mobile: "text"});

const EventPartnerModel = model("event_partner", EventPartnerSchema);
module.exports = EventPartnerModel