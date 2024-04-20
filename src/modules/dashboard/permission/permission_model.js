const { default: mongoose } = require("mongoose");

const PermissionSchema = new mongoose.Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true},
    description: {type: String},
    active: {type: Boolean, required: true}, // 1 => true, 0 => false
    createAt: {type: String, required: true, default: ""},
    updateAt: {type: String, default: ""},
    content: {type: String}
});

module.exports = {
    PermissionModel: mongoose.model("permission", PermissionSchema)
}