const keys = require("./../../auth/keys.json")

const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { SlashCommandBuilder } = require("@discordjs/builders")

const clientID = keys.clientID

const rest = new REST({ version: "9" }).setToken(keys.token)

var getTopScores = new SlashCommandBuilder()
	.setDescription("Get the top scores")
	.setName("top")
	.addIntegerOption((options) => options.setName("page").setDescription("The page of scores to retrieve").setRequired(false))
	.addStringOption((options) => options.setName("personality").setDescription("The personality to retrieve").setRequired(false))
	.addUserOption((options) => options.setName("user").setDescription("The user to retrieve").setRequired(false))
var submitScore = new SlashCommandBuilder()
	.setDescription("Submit a score")
	.setName("submit")
	.addNumberOption((options) => options.setName("time").setDescription("The score to submit").setRequired(true))
	.addStringOption((options) => options.setName("personality").setDescription("The personality you speedran").setRequired(true))
	.toJSON()

var commands = [submitScore, getTopScores]

rest.put(Routes.applicationGuildCommands(clientID, "935581835008831499"), { body: commands })
