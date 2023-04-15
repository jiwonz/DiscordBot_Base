import { BotClient } from "../classes/BotClient"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v10"
import * as fs from "fs"

const config:{
    TOKEN:string,
    CLIENT_ID:string
} = require("../../config.json")

export default (client:BotClient) => {
    client.handleCommands = async (commandFolders:Array<{}>,path) => {
        client.commandArray = []
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith(".ts"))
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`).default
                client.commands.set(command.data.name, command)
                client.commandArray.push(command.data.toJSON())
            }
        }

        const rest:REST = new REST({
            version: "10"
        }).setToken(config.TOKEN)

        {(async () => {
            try {
                console.log("Started refreshing application (/) commands.")

                await rest.put(
                    Routes.applicationCommands(config.CLIENT_ID), {
                        body: client.commandArray
                    },
                )

                console.log("Successfully reloaded application (/) commands.")
            } catch (error) {
                console.error(error)
            }
        })()}
    }
}