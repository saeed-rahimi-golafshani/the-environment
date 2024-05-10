const { Schema, Types, model } = require("mongoose");

const BanerSchema = new Schema({
    baner_code: {type: String, required: true, unique: true},
    file: {type: Types.ObjectId, ref: "file"},
    title: {type: String, required: true},
    target: {type: String},
    link: {type: String},
    sub_title: {type: String},
    description: {type: String}
});

const BanerModel = model("baner", BanerSchema);
module.exports = BanerModel;