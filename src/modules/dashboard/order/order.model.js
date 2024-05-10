const { Schema, model, Types } = require("mongoose");


const OrderSchema = new Schema({
    code: {type: String, required: true},
    order_date_created: {type: String, required: true},
    Order_time_created: {type: String, required: true},
    total_sales: {type: Number, default: 0, required: true},
    tax_total: {type: Number, default: 0},
    price_total: {type: Number, default: 0, required: true},
    order_category_id: {type: Types.ObjectId, ref: "order_category", required: true},
    order_status_id: {type: Types.ObjectId, ref: "order_status", required: true},
    user_id: {type: Types.ObjectId, ref: "user", required: true}
});

const OrderModel = model("order", OrderSchema);
module.exports = OrderModel