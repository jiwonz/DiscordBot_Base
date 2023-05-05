import { IntentsBitField, Collection } from "discord.js"
import { BotClient } from "./core/classes/BotClient"
import * as fs from "fs"
import * as path from "path"

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
  events:fs.readdirSync("./src/core/events").filter(file => file.endsWith(".ts"))
}

// custom
client.handleEvents(dir.events,path.resolve("./events"))
client.handleCommands(dir.commands,path.resolve("./commands"))
// core
client.handleEvents(core.events,path.resolve("./core/events"))

client.login(secret.TOKEN)

export { client, config, secret }