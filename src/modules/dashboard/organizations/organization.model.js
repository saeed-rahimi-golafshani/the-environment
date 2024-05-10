const { Schema, Types, model } = require("mongoose");

const OrganizationSchema = new Schema({
    code: {type: String, required: true, unique: true},
    file: {type: Types.ObjectId, ref: "file"},
    title: {type: String, required: true},
    slug: {type: String, required: true},
    description: {type: String, required: true},
    tags: {type: [String], default: []},
    published_status: {type: Boolean, default: false},
    show_in_main_page: {type: Boolean, default: false}
});
OrganizationSchema.index({title: "text", slug: "text"});

const OrganizationModel = model("organization", OrganizationSchema);
module.exports = OrganizationModel;