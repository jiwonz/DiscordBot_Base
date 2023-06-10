import { DMChannel, Message } from "discord.js";
import { BotClient } from "../classes/BotClient"
import { config } from "../../index"

export default {
    async execute(client:BotClient,message:Message) {
        if (!client.isDeveloper(message.author.id)) return
        if (!(message.channel instanceof DMChannel)) return
        const args = message.content.split(" ")

        if (args[0][0] === config.DEV_COMMAND_PREFIX) {

            console.log(JSON.stringify(client.developerCommands))

            const cmd = client.developerCommands[`${args[0]} ${args[1]}`]
            if (cmd != null) {
                args.splice(0,1)
                cmd.execute(client,args,message)
            }
        }
    },
};
