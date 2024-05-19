const { Schema, model } = require("mongoose");

const PermissionSchema = new Schema({
    code: {type: String, unique: true},
    title: {type: String, required: true},
    slug: {type: String, required: true},
    description: {type: String},
    status: {type: Boolean, required: true}, // 1 => true, 0 => false
    createAt: {type: String, required: true, default: ""},
    updateAt: {type: String, default: ""},
    content: {type: String}
});
PermissionSchema.index({title: "text", slug: "text"})

const PermissionModel = model("permission", PermissionSchema);
module.exports = PermissionModel