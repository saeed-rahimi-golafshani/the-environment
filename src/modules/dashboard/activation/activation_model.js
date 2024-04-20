const { Schema, model, Types } = require("mongoose");

const OTPSchema = new Schema({
    code: {type: String, required: false, default: undefined},
    expiresIn: {type: Number, required: false, default: 0}
});

const ActivationSchema = new Schema({
    activation_code: {type: String, required: true, unique: true},
    user_Id: {type: Types.ObjectId, ref: "user"},
    otp: {type: OTPSchema},
    type: {type: String, default: "mobile"},
    createdAt: {type: String, required: true},
    updatedAt: {type: String, required: true}
});

const ActivationModel = model("activation", ActivationSchema);
module.exports = ActivationModel;