const { Schema, Types, model } = require("mongoose");

const Baner_linkSchema = new Schema({
    code: {type: String, unique: true},
    baner_id: {type: Types.ObjectId, ref: "baner"},
    title: {type: String, required: true},
    description: {type: String},
    sub_title: {type: String},
    target: {type: String},
    link: {type: String},
    link_title: {type: String},
    icon: {type: String}
});

const BanerLinkModel = model("baner_link", Baner_linkSchema);
module.exports = BanerLinkModel