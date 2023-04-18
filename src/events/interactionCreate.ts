import { Interaction } from "discord.js"
import { BotClient } from "../classes/BotClient"

export default {
    async execute(interaction:Interaction, client:BotClient) {
        if (!interaction.isCommand()) return
        const command = client.commands.get(interaction.commandName)
        if (!command) return
        
        try{
            await command.execute(client, interaction)
        } catch (error) {
            console.log(error)
            await interaction.reply({
                content: 'There was an error while executing this command!', 
                ephemeral: true
            })
        } 
    },
}