const { Schema, model, Types } = require("mongoose");

const NewsCategorySchema = new Schema({
    code: {type: String, required: true, unique: true},
    file: {type: Types.ObjectId, ref: "file"},
    parent: {type: Types.ObjectId, default: "", ref: "news_category"},
    title: {type: String, required: true},
    slug: {type: String, index: true, required: true},
    description: {type: String},
    tags: {type: [String], default: []},
    show_in_archive: {type: Boolean, default: false, required: false},
    priority: {type: Boolean, default: false, required: false},
    createdAt: {type: String, required: false},
    updatedAt: {type: String, required: false},
}, {
    id: false,
    toJSON: {virtuals: true}
});

NewsCategorySchema.index({title: "text", slug: "text"});

const NewsCategoryModel = model("news_category", NewsCategorySchema);
module.exports = NewsCategoryModel