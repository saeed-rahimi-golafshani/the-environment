const { Schema, model, Types } = require("mongoose");

const SettingSchema = new Schema({
    file: {type: Types.ObjectId, ref: "file"},
    site_icon: {type: String},
    title: {type: String, required: true},
    title_next_to_Logo: {type: Boolean, default: false},
    description: {type: String},
    tags: {type: [String], default: []},
    title_mega_menu: {type: String},
    mega_menu_icon: {type: String},
    title_first_footer: {type: String},
    title_second_footer: {type: String},
    title_third_footer: {type: String},
    title_fourth_menu: {type: String},
    phone_number: {type: String},
    email: {type: String},
    android_link: {type: String, default: "#"},
    ios_link: {type: String, default: "#"},
    slider_delay: {type: Number, default: 2},
    launching_status: {type: Boolean, default: false},
    launching_title: {type: String},
    launching_description: {type: String},
}, {
    toJSON: {virtuals: true}
});

const SettingsModel = model("setting", SettingSchema);
module.exports = SettingsModel