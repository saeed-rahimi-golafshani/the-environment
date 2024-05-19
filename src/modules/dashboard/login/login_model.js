const { Schema, Types, model } = require("mongoose");

const LoginSchema = new Schema({
    user_id: {type: Types.ObjectId, ref: "user"},
    browser_id: {type: Types.ObjectId, ref: "browser"},
    ip_number: {type: String},
    createdAt: {type: String},
    updatedAt: {type: String},
    logoutAt: {type: String},
});

const LoginModel = model("login", LoginSchema);
module.exports = LoginModel;