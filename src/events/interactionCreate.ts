import { Interaction } from "discord.js"
import { BotClient } from "../classes/BotClient"

export default {
    async execute(interaction:Interaction, client:BotClient) {
        if (!interaction.isCommand()) return
        const command = client.commands.get(interaction.commandName)
        if (!command) return
        
        try{
            if (client.isDeveloper(interaction.member.user.id)) {
                await command.execute(client, interaction)
            } else {
                await interaction.reply({ content: "현재 봇이 개발 모드에 있습니다. 봇 개발자만 이용할 수 있습니다.", ephemeral: true })
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