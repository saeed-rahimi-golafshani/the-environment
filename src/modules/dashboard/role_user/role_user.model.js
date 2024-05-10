const { Schema, model } = require("mongoose");

const RoleUserSchema = new Schema({
    code: {type: String, required: true, unique: true},
    role_id: {type: Types.ObjectId, ref: "role"},
    user_id: {type: Types.ObjectId, ref: "user"},
});

const RoleUserModel = model("role_user", RoleUserSchema);
module.exports = RoleUserModel