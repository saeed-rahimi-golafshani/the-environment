const { Schema, Types, model } = require("mongoose");

const PaymentSchema = new Schema({
    invoiceNumber: {type: String},
    port: {type: String},
    port_Id: {type: String}, // authority
    payment_date: {type: String},
    totalPrice: {type: Number, default: 0},
    description: {type: String},
    verify: {type: Boolean, default: false},
    user_Id: {type: Types.ObjectId, ref: "user", required: true},
    order_id: {type: Types.ObjectId, ref: "order", required: true},
    refId: {type: String, default: undefined},
    cardHash: {type: String}
});

module.exports = {
    PaymentModel: model("payment", PaymentSchema)
};