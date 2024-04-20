const { Schema, Types, model } = require("mongoose");

const LoginSchema = new Schema({
    login_code: {type: String, required: true, unique: true},
    user_Id: {type: Types.ObjectId, ref: "user"},
    browser_Id: {type: Types.ObjectId, ref: "browser"},
    ip_Number: {type: String},
    createdAt: {type: String},
    updatedAt: {type: String},
    logoutAt: {type: String},
});

const LoginModel = model("login", LoginSchema);
module.exports = LoginModel;