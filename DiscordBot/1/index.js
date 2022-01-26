const fs = require("fs")
const keys = require("./../../auth/keys.json")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { SlashCommandBuilder } = require("@discordjs/builders")
// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js")
const Mongoose = require("mongoose")
const Score = require("./schemas/Score")
const DB = Mongoose.connect(keys.mongoServer + keys.mongoDb, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once("ready", () => {
	console.log("Ready!")
})

// Login to Discord with your client's token
client.login(keys.token)

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return

	switch (interaction.commandName) {
		case "submit":
			console.log(interaction.options.data)
			console.log(interaction.options.getNumber("time", true))

			var dummy = new Score({
				time: interaction.options.getNumber("time", true),
				category: interaction.options.getString("category", true),
				personality: interaction.options.getString("personality", true),
				user: interaction.user.id,
			})
			await dummy.save()

			//interaction.reply(scores.toString())
			break
		case "top":
			console.log(
				await Score.find({ user: interaction.user.id}).sort({ time: -1 }).limit(5)
			)
	}
})
