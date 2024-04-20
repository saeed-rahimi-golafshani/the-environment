const { Schema, Types, model } = require("mongoose");

const SliderSchema = new Schema({
    code: {type: String, unique: true},
    image: {type: String},
    link: {type: String, default: false},
    link_title: {type: String},
    active: {type: Boolean, default: false},
    class_active: {type: String},
    title: {type: String},
    sub_title: {type: String}
}, {
    toJSON: {virtuals: true}
});

const SliderModel = model("slider", SliderSchema);
module.exports = SliderModel