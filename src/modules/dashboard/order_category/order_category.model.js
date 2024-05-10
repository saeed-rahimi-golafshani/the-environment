const { Schema, model } = require("mongoose");

const OrderCategorySchema = new Schema({
    status: {type: String}
})

module.exports = {
    OrderCategoryModel: model("order_category", OrderCategorySchema)
};