const { Schema, Types, model } = require("mongoose");

const BrowserSchema = new Schema({
    user_id: {type: Types.ObjectId, ref: "user"},
    browser: {type: String},
    version: {type: String},
    os: {type: String},
    platform: {type: String},
    source: {type: String},
    geo_ip: {type: Object},
    is_mobile: {type: Boolean, default: false},
    is_desktop: {type: Boolean, default: false}
});

const BrowserModel = model("browser", BrowserSchema);
module.exports = BrowserModel;