const { Schema, model} = require("mongoose");

const StateSchema = new Schema({
    code: {type: String, unique: true},
    stateName: {type: String, required: true}
});

StateSchema.index({stateName: "text"});

const StateModel = model("state", StateSchema)
module.exports = StateModel;
