const { Schema, model, Types } = require("mongoose");

const MegaMenuSchema = new Schema({
    mega_menu_code: {type: String, unique: true},
    file: {type: Types.ObjectId, ref: "file"},
    parent: {type: Types.ObjectId, ref: "mega_menu", default: undefined},
    title: {type: String, required: true},
    link: {type: String, required: true, default: "#"},
    icon: {type: String, required: true},
}, {
    toJSON: {
        virtuals: true
    }
});

MegaMenuSchema.index({title: "text"});

const MegaMenuModel = model("mega_menu", MegaMenuSchema);
module.exports = MegaMenuModel 