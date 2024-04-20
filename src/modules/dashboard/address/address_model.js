const { Schema, Types, model } = require("mongoose");

const AddressSchema = new Schema({
    address_code: {type: String, required: true, unique: true},
    user_Id: {type: Types.ObjectId, required: true, ref: "user"},
    state_Id: {type: Types.ObjectId, required: true, ref: "state"},
    city: {type: String, required: true},
    address1: {type: String, required: true},
    address2: {type: String},
    postal_code: {type: Number, default: 0},
    pelak: {type: String},
    is_default: {type: Boolean, default: false},
    createdAt: {type: String},
    updatedAt: {type: String}
});

const AddressModel = model("address", AddressSchema);
module.exports = AddressModel;