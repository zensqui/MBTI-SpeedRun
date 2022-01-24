const keys = require("./../../auth/keys.json")


const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { SlashCommandBuilder } = require("@discordjs/builders")

const clientID = keys.clientID

const rest = new REST({ version: "9" }).setToken(keys.token)

var getTopScores = new SlashCommandBuilder()
getTopScores.setDescription("Get the top scores")
getTopScores.setName("top")
getTopScores.addIntegerOption((options) => options.setName("page").setDescription("The page of scores to retrieve").setRequired(false))
console.log(getTopScores.toJSON())
var submitScore = new SlashCommandBuilder()
	.setDescription("Submit a score")
	.setName("submit")
	.addNumberOption((options) => options.setName("time").setDescription("The score to submit").setRequired(true))
	.addStringOption((options) => options.setName("category").setDescription("The category of the score").setRequired(true))
	.addStringOption((options) => options.setName("personality").setDescription("The personality you speedran").setRequired(true))
	.toJSON()

var commands = [submitScore, getTopScores]

rest.put(Routes.applicationGuildCommands(clientID, "854402265052610620"), { body: commands })