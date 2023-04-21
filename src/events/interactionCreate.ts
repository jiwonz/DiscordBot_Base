import { Interaction } from "discord.js"
import { BotClient } from "../classes/BotClient"
import { config } from "../index"

export default {
    async execute(interaction:Interaction, client:BotClient) {
        if (!interaction.isCommand()) return
        const command = client.commands.get(interaction.commandName)
        if (!command) return
        
        try{
            if (client.isDeveloper(interaction.member.user.id)) {
                await command.execute(client, interaction)
            } else {
                await interaction.reply({ content: config.IN_DEV_MESSAGE, ephemeral: true })
            }
        } catch (error) {
            console.log(error)
            await interaction.reply({
                content: 'There was an error while executing this command!', 
                ephemeral: true
            })
        } 
    },
}