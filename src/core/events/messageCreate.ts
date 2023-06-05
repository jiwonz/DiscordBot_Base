import { Message } from "discord.js";
import { BotClient } from "../classes/BotClient"
import { config } from "../../index"

export default {
    async execute(client:BotClient,message:Message) {
        if (!client.isDeveloper(message.author.id)) return
        const args = message.content.split(" ")

        if (args[0][0] === config.DEV_COMMAND_PREFIX) {

            console.log(JSON.stringify(client.developerCommands))

            const cmd = client.developerCommands[args[0]]
            if (cmd != null) {
                cmd.execute(client,args,message)
            }
        }
    },
};
