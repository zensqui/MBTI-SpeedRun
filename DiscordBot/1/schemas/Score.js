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
})
//AI assistant ftw lmfao
var Score = mongoose.model("Score", ScoreSchema)
module.exports = Score
