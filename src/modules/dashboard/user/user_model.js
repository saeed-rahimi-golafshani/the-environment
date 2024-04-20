const { Schema, Types, model } = require("mongoose");
const { USER_GENDER } = require("../../common/utills/constant");

const UserSchema = new Schema({
    user_code: {type: String, unique: true},
    name: {type: String},
    mobile: {type: String, required: true, unique: true},
    email: {type: String, lowercase: true},
    birthday: {type: String},
    gender: {type: String, default: USER_GENDER.UNKNOWN}, // جنسیت
    reagent: {type: Types.ObjectId, ref: "user"}, // معرف
    bank_cart: {type: String},
    wallet: {type: Number, default: 0},
    score: {type: Number, default: 0}, // امتیاز
    access_profile: {type: Boolean, default: false}, // وضعیت
    Phone_verification: {type: Boolean, default: false}, // تایید شماره موبایل
    email_verification: {type: Boolean, default: false}, // تایید ایمیل
    createdAt: {type: String},
    updatedAt: {type: String},
    role_Id: {type: Types.ObjectId, ref: "role"}
});
UserSchema.index({user_code: "text", name: "text", mobile: "text", email: "text"});

const UserModel = model("user", UserSchema);
module.exports = UserModel;