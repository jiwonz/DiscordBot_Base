import { Message } from "discord.js"
import { BotClient } from "../../classes/BotClient"
import { SlashCommandBuilder } from "@discordjs/builders"

export default {
    data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("TEST TEST"),
    async execute(message:Message, client:BotClient) {
        await message.reply({content:"hello this is test boi!"})
    }
}