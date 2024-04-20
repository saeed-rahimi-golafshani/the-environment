const { Schema, Types, model } = require("mongoose");

const BlogSchema = new Schema({
    code: {type: String, required: true, unique: true},
    blog_category_id: {type: Types.ObjectId, ref: "blog_category", required: true},
    file: {type: Types.ObjectId, ref: "file"},
    title: {type: String, required: true},
    slug: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    tags: {type: [String], default: []},
    blog_type: {type: String},
    published_time: {type: String},
    published_status: {type: Boolean, default: false},
    createdAt: {type: String},
    updatedAt: {type: String}
});

BlogSchema.index({title: "text", slug: "text"});

const blogModel = model("blog", BlogSchema);
module.exports = blogModel;