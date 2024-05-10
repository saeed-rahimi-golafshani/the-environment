const { Types, Schema, model } = require("mongoose");


const OrderDetaileSchema = new Schema({
    code: {type: String, required: true},
    order_id: {type: Types.ObjectId, ref: "order", required: true},
    ticket_id: {type: Types.ObjectId, ref: "event_ticket", required: true},
    user_id: {type: Types.ObjectId, ref: "user", required: true},
    date_created: {type: String},
    stock: {type: Number, default: 0, required: true},
    tax_amount: {type: Number, default: 0},
    detail: {type: String},
    price: {type: Number, default: 0},
    total_price: {type: Number, default: 0}
});

module.exports = {
    OrderDetailModel: model("order_detail", OrderDetaileSchema)
};