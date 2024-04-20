const { default: mongoose} = require("mongoose");

const CitySchema = new mongoose.Schema({
    city_code: {type: String, required: true, unique: true},
    state_Id: {type: mongoose.Types.ObjectId, ref: "state", required: true},
    cityName: {type: String, required: true}
});

module.exports = {
    CityModel: mongoose.model("city", CitySchema)
};