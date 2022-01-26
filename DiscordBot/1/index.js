const fs = require("fs")
const keys = require("./../../auth/keys.json")
const MBTI = require("./../data/MBTI.json")
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
			var temp = {
				time: interaction.options.getNumber("time", true),
				//category: interaction.options.getString("category", true),
				personality: interaction.options.getString("personality", true),
				userID: interaction.user.id,
			}
			var personality = interaction.options.getString("personality", true)
			if (personality) {
				var toggle = false
				MBTI["all-types"].forEach((type) => {
					if (type.code == personality) toggle = true
					if (type.name == personality) toggle = true
				})
				if (!toggle) return interaction.reply("Invalid category")
			}

			var dummy = new Score(temp)
			await dummy.save()

			interaction.reply(temp)

			break
		case "top":
			var mongoSearch = {}
			var personality = interaction.options.getString("personality", false)

			var user = interaction.options.getUser("user", false)
			if (personality) {
				var toggle = false
				MBTI["all-types"].forEach((type) => {
					if (type.code == personality) toggle = true
					if (type.name == personality) toggle = true
				})
				if (!toggle) return interaction.reply("Invalid category")
				mongoSearch.personality = personality
			}
			if (user) mongoSearch.userID = user.id
			console.log(mongoSearch)
			var scores = await Score.find(mongoSearch).sort({ time: -1 }).limit(10)
			var output = ""
			scores.forEach((score) => {
				output += `${score.user} - ${score.time} - ${score.personality}\n`
			})
			interaction.reply()
	}
})
