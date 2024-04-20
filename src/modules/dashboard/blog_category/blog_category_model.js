const { Schema, Types, model } = require("mongoose");

const BlogCategorySchema = new Schema({
    code: {type: String, required: true, unique: true},
    parent: {type: Types.ObjectId, ref: "blog_category"},
    title: {type: String, required: true},
    slug: {type: String, index: true, required: true},
    icon: {type: String},
    show_in_archive: {type: Boolean, default: false, required: false},
    priority: {type: Boolean, default: false, required: false},
    createdAt: {type: String, required: false},
    updatedAt: {type: String, required: false}    
}, {
    id: false,
    toJSON: {virtuals: true}
});
BlogCategorySchema.index({title: "text", slug: "text"}); 

const BlogCategoryModel = model("blog_category", BlogCategorySchema);
module.exports = BlogCategoryModel