import { BotClient } from "../classes/BotClient"

export default {
    once: true,
    async execute(client:BotClient) {
        console.log("Ready!");
    },
};