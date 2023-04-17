import { IntentsBitField, Collection } from "discord.js"
import { BotClient } from "./classes/BotClient"
import * as fs from "fs"

//test

const config:{
    TOKEN:string,
    CLIENT_ID:string
} = require("../config.json")

const client:BotClient = new BotClient({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
})

client.commands = new Collection()

const dir = {
    functions:fs.readdirSync("./src/functions").filter(file => file.endsWith(".ts")),
    events:fs.readdirSync("./src/events").filter(file => file.endsWith(".ts")),
    commands:fs.readdirSync("./src/commands")
}

for (const file of dir.functions) {
    require(`./functions/${file}`).default(client)
}
client.handleEvents(dir.events,"./src/events")
client.handleCommands(dir.commands,"./src/commands")
client.login(config.TOKEN)