import { DMChannel, Message } from "discord.js";
import { BotClient } from "../classes/BotClient"
import { config } from "../../index"

export default {
    async execute(client:BotClient,message:Message) {
		const firstSplit = message.content.split(' ');
		const args = firstSplit.map(item => item.split('\n'));
		if (args[0][0] === config.COMMAND_PREFIX) {

			console.log("prefix commands debug log:",JSON.stringify(client.prefixCommands))

			const cmd = client.prefixCommands[`${args[0]}`]
			if (cmd != null) {
				args.splice(0,1)
				cmd.execute(client,args,message)
				return
			}
		}

        if (!client.isDeveloper(message.author.id)) return
        if (!(message.channel instanceof DMChannel)) return

        if (args[0][0] === config.DEV_COMMAND_PREFIX) {

            console.log("dev commands debug log:",JSON.stringify(client.developerCommands))

            const cmd = client.developerCommands[`${args[0]} ${args[1]}`]
            if (cmd != null) {
                args.splice(0,1)
                cmd.execute(client,args,message)
            }
        }
    },
};
