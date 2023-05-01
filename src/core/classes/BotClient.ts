import { Client, Collection } from "discord.js"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v10"
import * as fs from "fs"
import { config, secret } from "../../index"

export class BotClient extends Client {
    constructor(config) {
        super(config)
    }

    async handleEvents(eventFiles) {
        for (const file of eventFiles) {
            const event = require(`../events/${file}`)
            const filename = file.replace(".ts","")
            if (event.once) {
                this.once(filename, (...args) => event.default.execute(...args,this))
            } else {
                this.on(filename, (...args) => event.default.execute(...args,this))
            }
        }
    }

    async handleCommands(commandFolders:Array<{}>,path:string) {
        this.commandArray = []
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith(".ts"))
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`).default
                this.commands.set(command.data.name, command)
                this.commandArray.push(command.data.toJSON())
            }
        }

        const rest:REST = new REST({
            version: "10"
        }).setToken(secret.TOKEN)

        {(async () => {
            try {
                console.log("Started refreshing application (/) commands.")

                await rest.put(
                    Routes.applicationCommands(secret.CLIENT_ID), {
                        body: this.commandArray
                    },
                )

                console.log("Successfully reloaded application (/) commands.")
            } catch (error) {
                console.error(error)
            }
        })()}
    }

    isWhitelisted(userId:string):boolean {
        return Object.values(config.WHITELIST).includes(userId) == true
    }

    isDeveloper(userId:string):boolean {
        const whitelistedUserIds = Object.values(config.WHITELIST);
        const whitelistedUserNames = Object.keys(config.WHITELIST);
        const index = whitelistedUserIds.indexOf(userId);
        if (index !== -1) {
          const userName = whitelistedUserNames[index];
          return (config.DEVELOPERS as string[]).includes(userName);
        } else {
          return false;
        }
      }
    
    public commands:Collection<any,any>
    public commandArray:Array<[]>
}