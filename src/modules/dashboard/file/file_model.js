const { Schema, model, Types } = require("mongoose");
require("dotenv").config();

const FileSchema = new Schema({
    type_Id: {type: Types.ObjectId, required: true, refPath: "typeModel"},
    cover: {type: [String]},
    files: {type: [String]},
    originalnames: {type: [String], default: []},
    encoding: {type: [String], default: []},
    mimetype: {type: [String], default: []},
    filename: {type: [String], default: []},
    size: {type: String},    
    type: {
        type: String,
        required: true,
        enum: ['setting', 'blog']
    },
    createdAt: {type: String},
    updatedAt: {type: String},
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});
FileSchema.virtual("galleryUrl").get(function() {
    return this.files.map(file => `${process.env.BASEURL}:${process.env.PORT}/${file}`)
});
FileSchema.virtual("coverImageUrl").get(function() {
    return this.cover.map(file => `${process.env.BASEURL}:${process.env.PORT}/${file}`)
});

const FileModel = model("file", FileSchema);
module.exports = FileModel