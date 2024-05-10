const { Schema, Types, model } = require("mongoose");

const EventTicketSchema = new Schema({
    code: {type: String, required: true, unique: true},
    event_id: {type: Types.ObjectId, ref: "event"},
    price: {type: Number, required: true, default: 0},
    seat_number: {type: Number, default: 0},
    stock: {type: Number, default: 0}
});

const EventTicketModel = model("event_ticket", EventTicketSchema);
module.exports = EventTicketModel