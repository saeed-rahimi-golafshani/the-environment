const { Schema, Types, model } = require("mongoose");

const NewsSchema = new Schema({
    code: {type: String, required: true, unique: true},
    news_category_id: {type: Types.ObjectId, ref: "news_category", required: true},
    file: {type: Types.ObjectId, ref: "file"},
    foreword: {type: String}, // پیشگفتار
    title: {type: String, required: true},
    slug: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    tags: {type: [String], default: []},
    source: {type: String, required: true},
    published_status: {type: Boolean, default: false},
    published_time: {type: String, required: true},
    breaking_news:{type: Boolean, default: false},
    createdAt: {type: String},
    updatedAt: {type: String}
    // reporter
    // short_link
});

NewsSchema.index({title: "text", slug: "text", source: "text", code: "text"});

const NewsModel = model("news", NewsSchema);
module.exports = NewsModel; 