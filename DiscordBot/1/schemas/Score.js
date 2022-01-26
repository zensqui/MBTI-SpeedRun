const mongoose = require("mongoose")

var ScoreSchema = mongoose.Schema({
	time: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	personality: {
		type: String,
		required: true,
	},
	user: {
		type: String,
		required: true,
    },
    userID: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Score", ScoreSchema)
