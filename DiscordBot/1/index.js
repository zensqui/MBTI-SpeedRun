const fs = require("fs")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { SlashCommandBuilder } = require("@discordjs/builders")

const Mongoose = require("mongoose")
const Score = require("./schemas/Score")
const DB = Mongoose.connect(keys.mongoServer, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
var connection = Mongoose.connection



const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once("ready", () => {
	console.log("Ready!")
})

// Login to Discord with your client's token
client.login(keys.token)
