const { Schema, Types, model } = require("mongoose");

const RolePermissionSchema = new Schema({
  code: {type: String, unique: true},
  role_id: {type: Types.ObjectId, ref: "role", required: true},
  permission_id: {type: Types.ObjectId, ref: "permission", required: true},
  createAt: {type: String, required: true, default: ""},
  updateAt: {type: String, default: ""},
});

const RolePermissionModel = model("role_permission", RolePermissionSchema)
module.exports = RolePermissionModel