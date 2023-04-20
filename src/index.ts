import { IntentsBitField, Collection } from "discord.js"
import { BotClient } from "./classes/BotClient"
import * as fs from "fs"

const config:{
    TOKEN:string,
    CLIENT_ID:string,
    WHITELIST:{},
    DEVELOPERS:[]
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
    events:fs.readdirSync("./src/events").filter(file => file.endsWith(".ts")),
    commands:fs.readdirSync("./src/commands")
}

client.handleEvents(dir.events)
client.handleCommands(dir.commands,"./src/commands")
client.login(config.TOKEN)

export { client,config }