const { default: mongoose } = require("mongoose");

const EpisodeSchema = new mongoose.Schema({
    episode_code: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    text: {type: String, required: true},
    type_Id: {type: mongoose.Types.ObjectId, ref:"course_type" },
    time: {type: String, required: true},
    videoAddress: {type: String, required: true},
    chapter_Id: {type: mongoose.Types.ObjectId, ref: "chapter", required: true}
}, {
    timestamps: true
});

module.exports = {
    EpisodeModel: mongoose.model("episode", EpisodeSchema)
};