const { Schema, model } = require("mongoose");

const MenuSchema = new Schema({
    menu_code: {type: String, unique: true, required: true},
    title: {type: String},
    target: {type: String},
    link: {type: String},
    icon: {type: String},
});

const MenuModel = model("menu", MenuSchema);
module.exports = MenuModel 