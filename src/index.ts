import { IntentsBitField, Collection } from "discord.js"
import { BotClient } from "./core/classes/BotClient"
import * as fs from "fs"

import config from "./cfg/config.json"
import secret from "./cfg/secret.json"

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

const core = {
  events:fs.readdirSync("./src/core/events").filter(file => file.endsWith(".ts")),
  commands:fs.readdirSync("./src/core/commands")
}

// custom
client.handleEvents(dir.events)
client.handleCommands(dir.commands,"./src/commands")
// core
client.handleEvents(core.events)
//client.handleCommands(core.commands,"./src/commands")

client.login(secret.TOKEN)

export { client, config, secret }