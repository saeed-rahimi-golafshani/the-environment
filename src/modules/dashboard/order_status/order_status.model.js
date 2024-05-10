const { Schema, model } = require("mongoose");

const OrderStatusSchema = new Schema({
    status: {type: String}
})

module.exports = {
    OrderStatusModel: model("order_status", OrderStatusSchema)
};