const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { token } = require("./config.json")
const fs = require("fs")

const keys = require("./../../auth/keys.json")


const clientID = keys.clientID

const rest = new REST({ version: "9" }).setToken(keys.token)



