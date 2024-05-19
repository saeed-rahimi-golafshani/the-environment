const { Schema, model } = require("mongoose");

const RoleSchema = new Schema({
    code: {type: String, unique: true},
    title: {type: String, required: true},
    slug: {type: String, required: true},
    description: {type: String},
    status: {type: Boolean, required: true, default: false},
    createAt: {type: String, required: true, default: ""},
    updateAt: {type: String, default: ""},
    content: {type: String}
});

const RoleModel = model("role", RoleSchema);
module.exports = RoleModel