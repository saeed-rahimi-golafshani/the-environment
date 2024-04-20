const { Schema, model } = require("mongoose");

const ServicesSchema = new Schema({
    code: {type: String, unique: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    link: {type: String},
    icon: {type: String, required: true},
}, {
    toJSON: {virtuals: true}
});

const ServicesModel = model("service", ServicesSchema);
module.exports = ServicesModel