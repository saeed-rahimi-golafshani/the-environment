const { Schema, Types, model } = require("mongoose");

const NewsSchema = new Schema({
    news_code: {type: String, required: true, unique: true},
    news_category_id: {type: Types.ObjectId, ref: "news_category"},
    file: {type: Types.ObjectId, ref: "file"},
    title: {type: String, required: true},
    slug: {type: String, required: true},
    status_date: {type: String},
    short_text: {type: String},
    text: {type: String},
    source: {type: String},
    tags: {type: [String], default: []},
    createdAt: {type: String},
    updatedAt: {type: String}
});

const NewsModel = model("news", NewsSchema);
module.exports = NewsModel;